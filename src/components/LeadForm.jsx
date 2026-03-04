import React, { useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const mobileRegex = /^[6-9]\d{9}$/;
const emailRegex = /^\S+@\S+\.\S+$/;

function LeadForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    standard: "10th Standard",
    mobile: "",
    whatsapp: "",
  });
  const [sameAsWhatsapp, setSameAsWhatsapp] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const otpRefs = useRef([]);

  const sendOtp = async () => {
    if (!form.name) {
      toast.error("Please enter your name");
      return;
    }

    if (!emailRegex.test(form.email)) {
      toast.error("Enter a valid email address");
      return;
    }

    if (!mobileRegex.test(form.mobile)) {
      toast.error("Enter a valid 10 digit mobile number starting with 6-9");
      return;
    }

    const whatsappNumber = sameAsWhatsapp ? form.mobile : form.whatsapp;
    if (!mobileRegex.test(whatsappNumber)) {
      toast.error("Enter a valid WhatsApp number");
      return;
    }

    try {
      setLoading(true);
      await axios.post(
        "https://aptitude-registration-backend.onrender.com/api/leads/send-otp",
        {
          mobile: form.mobile,
        },
      );
      setOtpSent(true);
      setOtpDigits(["", "", "", "", "", ""]);
      toast.success("OTP sent to your mobile!");
      setTimeout(() => otpRefs.current[0]?.focus(), 0);
    } catch (error) {
      toast.error("Failed to send OTP");
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    const otp = otpDigits.join("");
    if (!otp || otp.length !== 6) {
      toast.error("Enter valid 6 digit OTP");
      return;
    }

    try {
      setLoading(true);
      await axios.post(
        "https://aptitude-registration-backend.onrender.com/api/leads/verify-otp",
        {
          mobile: form.mobile,
          otp,
          formData: {
            ...form,
            whatsapp: sameAsWhatsapp ? form.mobile : form.whatsapp,
          },
        },
      );

      toast.success("Registration Successful!");
      setTimeout(() => {
        window.location.href = "https://aptitudeguru.in/";
      }, 2000);
    } catch (error) {
      toast.error("OTP Verification Failed");
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index, value) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    const nextDigits = [...otpDigits];
    nextDigits[index] = digit;
    setOtpDigits(nextDigits);

    if (digit && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index, event) => {
    if (event.key === "Backspace") {
      if (otpDigits[index]) {
        const nextDigits = [...otpDigits];
        nextDigits[index] = "";
        setOtpDigits(nextDigits);
      } else if (index > 0) {
        otpRefs.current[index - 1]?.focus();
      }
    }

    if (event.key === "ArrowLeft" && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }

    if (event.key === "ArrowRight" && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpPaste = (event) => {
    event.preventDefault();
    const pastedDigits = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6)
      .split("");

    if (pastedDigits.length === 0) return;

    const nextDigits = ["", "", "", "", "", ""];
    pastedDigits.forEach((digit, idx) => {
      nextDigits[idx] = digit;
    });
    setOtpDigits(nextDigits);

    const focusIndex = Math.min(pastedDigits.length, 6) - 1;
    otpRefs.current[focusIndex]?.focus();
  };

  return (
    <aside id="register" className="register-card">
      <h2>Register Now</h2>
      <p>Secure your spot and start learning today.</p>

      <label htmlFor="name">Full Name</label>
      <input
        id="name"
        type="text"
        placeholder="Enter your full name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <label htmlFor="email">Email Address</label>
      <input
        id="email"
        type="email"
        placeholder="email@example.com"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <label htmlFor="standard">Course Level</label>
      <select
        id="standard"
        value={form.standard}
        onChange={(e) => setForm({ ...form, standard: e.target.value })}
      >
        <option>5th-10th Standard</option>
        <option>10th Standard</option>
        <option>12th Standard</option>
      </select>

      <label htmlFor="mobile">Mobile Number</label>
      <div className="mobile-row">
        <div className="phone-input-group">
          <span className="country-code">+91</span>
          <input
            id="mobile"
            type="text"
            maxLength="10"
            placeholder="9876543210"
            value={form.mobile}
            onChange={(e) =>
              setForm({ ...form, mobile: e.target.value.replace(/\D/g, "") })
            }
          />
        </div>
        <button
          className="verify-btn"
          type="button"
          onClick={sendOtp}
          disabled={loading}
        >
          {loading && !otpSent ? "Sending..." : otpSent ? "Sent" : "Verify"}
        </button>
      </div>

      {!sameAsWhatsapp && (
        <>
          <label htmlFor="whatsapp">WhatsApp Number</label>
          <div className="phone-input-group">
            <span className="country-code">+91</span>
            <input
              id="whatsapp"
              type="text"
              maxLength="10"
              placeholder="9876543210"
              value={form.whatsapp}
              onChange={(e) =>
                setForm({
                  ...form,
                  whatsapp: e.target.value.replace(/\D/g, ""),
                })
              }
            />
          </div>
        </>
      )}

      {otpSent && (
        <>
          <label htmlFor="otp-0">OTP</label>
          <div className="otp-row" onPaste={handleOtpPaste}>
            {otpDigits.map((digit, index) => (
              <input
                key={`otp-${index}`}
                id={`otp-${index}`}
                className="otp-box"
                type="text"
                maxLength="1"
                value={digit}
                inputMode="numeric"
                autoComplete="one-time-code"
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleOtpKeyDown(index, e)}
                onFocus={(e) => e.target.select()}
                ref={(el) => {
                  otpRefs.current[index] = el;
                }}
              />
            ))}
          </div>
        </>
      )}

      <div className="toggle-row">
        <span>Is your mobile number same as WhatsApp?</span>
        <button
          type="button"
          className={`toggle-btn ${sameAsWhatsapp ? "active" : ""}`}
          onClick={() => {
            const next = !sameAsWhatsapp;
            setSameAsWhatsapp(next);
            if (next) {
              setForm((prev) => ({ ...prev, whatsapp: prev.mobile }));
            }
          }}
          aria-label="Toggle WhatsApp same as mobile"
        >
          <span />
        </button>
      </div>

      <button
        className="register-btn"
        type="button"
        onClick={verifyOtp}
        disabled={loading || !otpSent}
      >
        {loading && otpSent ? "Registering..." : "Register Now"}
      </button>

      <small>
        By clicking register, you agree to our Terms of Service and Privacy
        Policy.
      </small>
    </aside>
  );
}

export default LeadForm;
