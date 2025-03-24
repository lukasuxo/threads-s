"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthSystem() {
  const router = useRouter();

  const [language, setLanguage] = useState<"en" | "ka">("en");

  const [activeScreen, setActiveScreen] = useState<
    "login" | "register" | "forgotPassword"
  >("login");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
  });

  const [resetEmail, setResetEmail] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const translations = {
    en: {
      loginTitle: "Log in with your Instagram account",
      emailPlaceholder: "Username, phone or email",
      passwordPlaceholder: "Password",
      loginButton: "Log in",
      forgotPassword: "Forgotten password?",
      or: "or",
      createAccount: "Create new account",
      continueWithInstagram: "Continue with Instagram",

      registerTitle: "Register a new account",
      fullNamePlaceholder: "Full Name",
      emailRegisterPlaceholder: "Email",
      passwordRegisterPlaceholder: "Password",
      confirmPasswordPlaceholder: "Confirm Password",
      registerButton: "Register",
      alreadyHaveAccount: "Already have an account? Sign in",

      recoveryTitle: "Password recovery",
      recoveryDescription:
        "Enter your email address and we will send you a password recovery link.",
      sendButton: "Send",
      returnToLogin: "Return to the authorization page",

      welcome: "Welcome!",
      authSuccess: "You have successfully logged in as:",
      logoutButton: "Log Out",

      emailRequired: "Email is required",
      emailInvalid: "Email is invalid",
      passwordRequired: "Password is required",
      passwordLength: "Password must be at least 6 characters",
      usernameRequired: "Username is required",
      confirmPasswordRequired: "Please confirm your password",
      passwordsDoNotMatch: "Passwords do not match",
      invalidCredentials: "Invalid email or password",
      emailAlreadyRegistered: "This email is already registered",
      enterEmailAddress: "Please enter your email address",
      emailNotRegistered: "This email is not registered",

      loginSuccess: "Login successful!",
      registerSuccess: "Registration successful!",
      passwordResetSent: "Password reset link has been sent to",

      scanApp: "Scan to get the app",
      footer:
        "© 2025 · Threads Terms · Privacy Policy · Cookies Policy · Report a problem",

      switchLanguage: "KA",
    },
    ka: {
      loginTitle: "შედით თქვენი Instagram ანგარიშით",
      emailPlaceholder: "მომხმარებელი, ტელეფონი ან ელფოსტა",
      passwordPlaceholder: "პაროლი",
      loginButton: "შესვლა",
      forgotPassword: "დაგავიწყდათ პაროლი?",
      or: "ან",
      createAccount: "შექმენით ახალი ანგარიში",
      continueWithInstagram: "გააგრძელეთ Instagram-ით",

      registerTitle: "დაარეგისტრირეთ ახალი ანგარიში",
      fullNamePlaceholder: "სრული სახელი",
      emailRegisterPlaceholder: "ელფოსტა",
      passwordRegisterPlaceholder: "პაროლი",
      confirmPasswordPlaceholder: "გაიმეორეთ პაროლი",
      registerButton: "რეგისტრაცია",
      alreadyHaveAccount: "უკვე გაქვთ ანგარიში? შესვლა",

      recoveryTitle: "პაროლის აღდგენა",
      recoveryDescription:
        "შეიყვანეთ თქვენი ელფოსტის მისამართი და ჩვენ გამოგიგზავნით პაროლის აღდგენის ბმულს.",
      sendButton: "გაგზავნა",
      returnToLogin: "დაბრუნება ავტორიზაციის გვერდზე",

      welcome: "მოგესალმებით!",
      authSuccess: "თქვენ წარმატებით გაიარეთ ავტორიზაცია როგორც:",
      logoutButton: "გასვლა",

      emailRequired: "ელფოსტა აუცილებელია",
      emailInvalid: "ელფოსტა არასწორია",
      passwordRequired: "პაროლი აუცილებელია",
      passwordLength: "პაროლი უნდა შეიცავდეს მინიმუმ 6 სიმბოლოს",
      usernameRequired: "სახელი აუცილებელია",
      confirmPasswordRequired: "გთხოვთ დაადასტუროთ პაროლი",
      passwordsDoNotMatch: "პაროლები არ ემთხვევა",
      invalidCredentials: "არასწორი ელფოსტა ან პაროლი",
      emailAlreadyRegistered: "ეს ელფოსტა უკვე რეგისტრირებულია",
      enterEmailAddress: "გთხოვთ შეიყვანოთ ელფოსტის მისამართი",
      emailNotRegistered: "ეს ელფოსტა არ არის რეგისტრირებული",

      loginSuccess: "ავტორიზაცია წარმატებულია!",
      registerSuccess: "რეგისტრაცია წარმატებულია!",
      passwordResetSent: "პაროლის აღდგენის ბმული გაგზავნილია",

      scanApp: "დაასკანერეთ აპლიკაციის მისაღებად",
      footer:
        "© 2025 · Threads პირობები · კონფიდენციალურობის პოლიტიკა · ქუქი-ფაილების პოლიტიკა · შეგვატყობინეთ პრობლემის შესახებ",

      switchLanguage: "EN",
    },
  };

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      setIsAuthenticated(true);
    }

    if (!localStorage.getItem("registeredUsers")) {
      localStorage.setItem("registeredUsers", JSON.stringify([]));
    }

    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage === "ka" || savedLanguage === "en") {
      setLanguage(savedLanguage);
    }

    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, []);

  const toggleLanguage = () => {
    const newLanguage = language === "en" ? "ka" : "en";
    setLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    const t = translations[language];

    if (!formData.email) {
      newErrors.email = t.emailRequired;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t.emailInvalid;
    }

    if (activeScreen === "register" || activeScreen === "login") {
      if (!formData.password) {
        newErrors.password = t.passwordRequired;
      } else if (formData.password.length < 6) {
        newErrors.password = t.passwordLength;
      }
    }

    if (activeScreen === "register") {
      if (!formData.username) {
        newErrors.username = t.usernameRequired;
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = t.confirmPasswordRequired;
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = t.passwordsDoNotMatch;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const t = translations[language];

    if (!validateForm()) return;

    const registeredUsers = JSON.parse(
      localStorage.getItem("registeredUsers") || "[]"
    );

    const user = registeredUsers.find(
      (user: { email: string; password: string }) =>
        user.email === formData.email && user.password === formData.password
    );

    if (user) {
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      setIsAuthenticated(true);
      alert(t.loginSuccess);
    } else {
      setErrors({ general: t.invalidCredentials });
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const t = translations[language];

    if (!validateForm()) return;

    const registeredUsers = JSON.parse(
      localStorage.getItem("registeredUsers") || "[]"
    );

    const userExists = registeredUsers.some(
      (user: { email: string }) => user.email === formData.email
    );

    if (userExists) {
      setErrors({ email: t.emailAlreadyRegistered });
      return;
    }

    const newUser = {
      id: Date.now(),
      username: formData.username,
      email: formData.email,
      password: formData.password,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(
      "registeredUsers",
      JSON.stringify([...registeredUsers, newUser])
    );

    localStorage.setItem("loggedInUser", JSON.stringify(newUser));
    setIsAuthenticated(true);

    alert(t.registerSuccess);
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    const t = translations[language];

    if (!resetEmail) {
      setErrors({ resetEmail: t.enterEmailAddress });
      return;
    }

    const registeredUsers = JSON.parse(
      localStorage.getItem("registeredUsers") || "[]"
    );

    const user = registeredUsers.find(
      (user: { email: string }) => user.email === resetEmail
    );

    if (user) {
      alert(`${t.passwordResetSent} ${resetEmail}`);
      setActiveScreen("login");
    } else {
      setErrors({ resetEmail: t.emailNotRegistered });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setIsAuthenticated(false);
  };

  const renderAuthScreen = () => {
    const t = translations[language];

    switch (activeScreen) {
      case "login":
        return (
          <form
            onSubmit={handleLogin}
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h3
              style={{
                marginBottom: "20px",
                fontWeight: "500",
                fontSize: "16px",
                color: "#000",
                textAlign: "center",
              }}
            >
              {t.loginTitle}
            </h3>

            {errors.general && (
              <div
                style={{ color: "red", marginBottom: "10px", fontSize: "14px" }}
              >
                {errors.general}
              </div>
            )}

            <div style={{ marginBottom: "15px", width: "77%" }}>
              <input
                type="text"
                name="email"
                placeholder={t.emailPlaceholder}
                value={formData.email}
                onChange={handleChange}
                style={{
                  backgroundColor: "#f5f5f5",
                  padding: "12px 12px",
                  width: "100%",
                  borderRadius: "8px",
                  border: errors.email ? "1px solid red" : "1px solid #dbdbdb",
                  marginBottom: "8px",
                  fontSize: "14px",
                  outline: "none",
                }}
              />
              {errors.email && (
                <div
                  style={{
                    color: "red",
                    fontSize: "12px",
                    marginBottom: "10px",
                  }}
                >
                  {errors.email}
                </div>
              )}

              <input
                type="password"
                name="password"
                placeholder={t.passwordPlaceholder}
                value={formData.password}
                onChange={handleChange}
                style={{
                  backgroundColor: "#f5f5f5",
                  padding: "12px 12px",
                  width: "100%",
                  borderRadius: "8px",
                  border: errors.password
                    ? "1px solid red"
                    : "1px solid #dbdbdb",
                  marginBottom: "0",
                  fontSize: "14px",
                  outline: "none",
                }}
              />
              {errors.password && (
                <div
                  style={{ color: "red", fontSize: "12px", marginTop: "5px" }}
                >
                  {errors.password}
                </div>
              )}
            </div>

            <button
              type="submit"
              style={{
                padding: "8px 0",
                backgroundColor: "#000",
                color: "#ffffff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                marginBottom: "15px",
                width: "83%",
                fontWeight: "500",
                fontSize: "14px",
                height: "40px",
                marginLeft: "25px ",
              }}
            >
              {t.loginButton}
            </button>

            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setActiveScreen("forgotPassword");
              }}
              style={{
                fontSize: "14px",
                color: "#0095f6",
                marginBottom: "20px",
                textDecoration: "none",
              }}
            >
              {t.forgotPassword}
            </a>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                width: "20%",
                marginBottom: "20px",
              }}
            >
              <div
                style={{ flex: 1, height: "1px", backgroundColor: "#dbdbdb" }}
              ></div>
              <span
                style={{ margin: "0 10px", color: "#8e8e8e", fontSize: "15px" }}
              >
                {t.or}
              </span>
              <div
                style={{ flex: 1, height: "1px", backgroundColor: "#dbdbdb" }}
              ></div>
            </div>

            <button
              type="button"
              style={{
                padding: "20px",
                backgroundColor: "transparent",
                color: "#000",
                border: "1px solid #dbdbdb",
                borderRadius: "8px",
                cursor: "pointer",
                width: "83%",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                marginBottom: "20px",
                fontSize: "14px",
                marginLeft: "24px",
                fontWeight: "500",
              }}
            >
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  style={{ marginRight: "8px" }}
                >
                  <path
                    fill="#E4405F"
                    d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"
                  />
                </svg>
                {t.continueWithInstagram}
                <span style={{ marginLeft: "auto" }}>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.5 9L7.5 6L4.5 3"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  </svg>
                </span>
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveScreen("register")}
              style={{
                padding: "8px",
                backgroundColor: "transparent",
                color: "#0095f6",
                border: "none",
                borderRadius: "0",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "14px",
                marginTop: "10px",
              }}
            >
              {t.createAccount}
            </button>
          </form>
        );

      case "register":
        return (
          <form
            onSubmit={handleRegister}
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h3
              style={{
                marginBottom: "20px",
                fontWeight: "500",
                fontSize: "16px",
                color: "#000",
                textAlign: "center",
              }}
            >
              {t.registerTitle}
            </h3>

            <div style={{ marginBottom: "15px", width: "100%" }}>
              <input
                type="text"
                name="username"
                placeholder={t.fullNamePlaceholder}
                value={formData.username}
                onChange={handleChange}
                style={{
                  backgroundColor: "#f5f5f5",
                  padding: "12px 12px",
                  width: "80%",
                  borderRadius: "8px",
                  border: errors.username
                    ? "1px solid red"
                    : "1px solid #dbdbdb",
                  marginBottom: "8px",
                  fontSize: "14px",
                  outline: "none",
                  marginLeft: "30px",
                }}
              />
              {errors.username && (
                <div
                  style={{
                    color: "red",
                    fontSize: "12px",
                    marginBottom: "8px",
                    marginLeft: "30px",
                  }}
                >
                  {errors.username}
                </div>
              )}

              <input
                type="email"
                name="email"
                placeholder={t.emailRegisterPlaceholder}
                value={formData.email}
                onChange={handleChange}
                style={{
                  backgroundColor: "#f5f5f5",
                  padding: "12px 12px",
                  width: "80%",
                  borderRadius: "8px",
                  border: errors.email ? "1px solid red" : "1px solid #dbdbdb",
                  marginBottom: "8px",
                  fontSize: "14px",
                  outline: "none",
                  marginLeft: "30px",
                }}
              />
              {errors.email && (
                <div
                  style={{
                    color: "red",
                    fontSize: "12px",
                    marginBottom: "8px",
                    marginLeft: "30px",
                  }}
                >
                  {errors.email}
                </div>
              )}

              <input
                type="password"
                name="password"
                placeholder={t.passwordRegisterPlaceholder}
                value={formData.password}
                onChange={handleChange}
                style={{
                  backgroundColor: "#f5f5f5",
                  padding: "12px 12px",
                  width: "80%",
                  borderRadius: "8px",
                  border: errors.password
                    ? "1px solid red"
                    : "1px solid #dbdbdb",
                  marginBottom: "8px",
                  fontSize: "14px",
                  outline: "none",
                  marginLeft: "30px",
                }}
              />
              {errors.password && (
                <div
                  style={{
                    color: "red",
                    fontSize: "12px",
                    marginBottom: "8px",
                    marginLeft: "30px",
                  }}
                >
                  {errors.password}
                </div>
              )}

              <input
                type="password"
                name="confirmPassword"
                placeholder={t.confirmPasswordPlaceholder}
                value={formData.confirmPassword}
                onChange={handleChange}
                style={{
                  backgroundColor: "#f5f5f5",
                  padding: "12px 12px",
                  width: "80%",
                  borderRadius: "8px",
                  border: errors.confirmPassword
                    ? "1px solid red"
                    : "1px solid #dbdbdb",
                  marginBottom: "8px",
                  fontSize: "14px",
                  outline: "none",
                  marginLeft: "30px",
                }}
              />
              {errors.confirmPassword && (
                <div
                  style={{
                    color: "red",
                    fontSize: "12px",
                    marginLeft: "30px",

                    marginBottom: "8px",
                  }}
                >
                  {errors.confirmPassword}
                </div>
              )}
            </div>

            <button
              type="submit"
              style={{
                padding: "8px 0",
                backgroundColor: "#000",
                color: "#ffffff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                marginBottom: "15px",
                width: "86%",
                fontWeight: "500",
                fontSize: "14px",
                height: "40px",
              }}
            >
              {t.registerButton}
            </button>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                width: "20%",
                marginBottom: "20px",
              }}
            >
              <div
                style={{ flex: 1, height: "1px", backgroundColor: "#dbdbdb" }}
              ></div>
              <span
                style={{ margin: "0 10px", color: "#8e8e8e", fontSize: "15px" }}
              >
                {t.or}
              </span>
              <div
                style={{ flex: 1, height: "1px", backgroundColor: "#dbdbdb" }}
              ></div>
            </div>

            <button
              type="button"
              onClick={() => setActiveScreen("login")}
              style={{
                padding: "8px",
                backgroundColor: "transparent",
                color: "#0095f6",
                border: "none",
                borderRadius: "0",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "14px",
              }}
            >
              {t.alreadyHaveAccount}
            </button>
          </form>
        );

      case "forgotPassword":
        return (
          <form
            onSubmit={handleForgotPassword}
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h3
              style={{
                marginBottom: "15px",
                fontWeight: "500",
                fontSize: "16px",
                color: "#000",
                textAlign: "center",
              }}
            >
              {t.recoveryTitle}
            </h3>

            <p
              style={{
                textAlign: "center",
                marginBottom: "20px",
                color: "#8e8e8e",
                fontSize: "14px",
                lineHeight: "1.4",
              }}
            >
              {t.recoveryDescription}
            </p>

            <div style={{ marginBottom: "15px", width: "100%" }}>
              <input
                type="email"
                placeholder={t.emailRegisterPlaceholder}
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                style={{
                  backgroundColor: "#f5f5f5",
                  padding: "12px 12px",
                  width: "95%",
                  borderRadius: "8px",
                  border: errors.resetEmail
                    ? "1px solid red"
                    : "1px solid #dbdbdb",
                  marginBottom: "8px",
                  fontSize: "14px",
                  outline: "none",
                }}
              />
              {errors.resetEmail && (
                <div
                  style={{
                    color: "red",
                    fontSize: "12px",
                    marginBottom: "8px",
                  }}
                >
                  {errors.resetEmail}
                </div>
              )}
            </div>

            <button
              type="submit"
              style={{
                padding: "8px 0",
                backgroundColor: "#000",
                color: "#ffffff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                marginBottom: "15px",
                width: "100%",
                fontWeight: "500",
                fontSize: "14px",
                height: "40px",
                marginLeft: "2px",
              }}
            >
              {t.sendButton}
            </button>

            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setActiveScreen("login");
              }}
              style={{
                fontSize: "14px",
                color: "#0095f6",

                marginBottom: "20px",
                textDecoration: "none",
                fontWeight: "600",
              }}
            >
              {t.returnToLogin}
            </a>
          </form>
        );
    }
  };

  const renderAuthenticatedContent = () => {
    const user = JSON.parse(localStorage.getItem("loggedInUser") || "{}");
    const t = translations[language];

    return (
      <div style={{ textAlign: "center" }}>
        <h2>{t.welcome}</h2>
        <p>
          {t.authSuccess} {user.username}
        </p>
        <button
          onClick={handleLogout}
          style={{
            padding: "8px 15px",
            backgroundColor: "#000",
            color: "#ffffff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            marginTop: "20px",
            fontWeight: "500",
            fontSize: "14px",
          }}
        >
          {t.logoutButton}
        </button>
      </div>
    );
  };

  const t = translations[language];

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        width: "100vw",
        height: "100vh",
        margin: "0",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      <button
        onClick={toggleLanguage}
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          padding: "8px 12px",
          backgroundColor: "#000000cd",
          color: "#ffffff",
          border: "none",
          borderRadius: "50px",
          cursor: "pointer",
          fontSize: "14px",
          zIndex: 10,
        }}
      >
        {t.switchLanguage}
      </button>

      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          overflow: "hidden",
          zIndex: 0,
        }}
      ></div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: "450px",
          width: "100%",
          padding: "20px",
          zIndex: 1,
        }}
      >
        <div style={{ marginBottom: "30px", textAlign: "center" }}>
          <div
            style={{
              display: "inline-block",
              position: "relative",
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              border: "5px solid #ff0000",
              backgroundColor: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "16px",
              fontWeight: "bold",
              color: "#ff0000",
            }}
          >
            SUXOS THREADS
          </div>
        </div>

        {isAuthenticated ? renderAuthenticatedContent() : renderAuthScreen()}
        {/* ქიუარ კოდი ჩასასმელი მაქვს //////////////////////////////////////////// */}
        <div
          style={{
            position: "absolute",
            right: "30px",
            bottom: "100px",
            textAlign: "center",
          }}
        >
          <div
            style={{ fontSize: "12px", color: "#999", marginBottom: "10px" }}
          >
            {t.scanApp}
          </div>
          <div
            style={{
              width: "100px",
              height: "100px",
              border: "1px solid #ddd",
              borderRadius: "5px",
              padding: "5px",
              backgroundColor: "white",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "#f9f9f9",
              }}
            ></div>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "20px",
            width: "100%",
            textAlign: "center",
            fontSize: "12px",
            color: "#999",
          }}
        >
          {t.footer}
        </div>
      </div>
    </div>
  );
}
