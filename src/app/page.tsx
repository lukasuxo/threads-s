"use client";
import { useState, useEffect } from "react";

export default function Home() {
  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, []);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isSignUp, setIsSignUp] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("registeredUsers")) {
      localStorage.setItem("registeredUsers", JSON.stringify([]));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const registeredUsers = JSON.parse(
      localStorage.getItem("registeredUsers") || "[]"
    );

    if (isSignUp) {
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      if (registeredUsers.some((user: any) => user.email === formData.email)) {
        alert("Email is already registered!");
        return;
      }

      registeredUsers.push({
        email: formData.email,
        password: formData.password,
      });
      localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));

      setFormData({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setIsSignUp(false);
      alert("Sign-up successful! Please log in.");
    } else {
      const user = registeredUsers.find(
        (user: any) =>
          user.email === formData.email && user.password === formData.password
      );

      if (user) {
        alert("Login successful!");
      } else {
        alert("Invalid email or password!");
      }
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#0d1117",
        width: "100vw",
        height: "100vh",
        margin: "0",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          backgroundColor: "#1c1e21",
          borderRadius: "10px",
          boxShadow: "0 0 15px rgba(0, 0, 0, 0.5)",
          overflow: "hidden",
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            padding: "40px",
            backgroundColor: "#1c1e21",
            color: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h2 style={{ marginBottom: "20px" }}>
            {isSignUp ? "Sign Up" : "Login"}
          </h2>
          <div style={{ marginBottom: "20px", width: "100%" }}>
            {isSignUp && (
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                style={{
                  padding: "10px",
                  width: "100%",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  marginBottom: "10px",
                }}
              />
            )}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              style={{
                padding: "10px",
                width: "100%",
                borderRadius: "5px",
                border: "1px solid #ccc",
                marginBottom: "10px",
              }}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              style={{
                padding: "10px",
                width: "100%",
                borderRadius: "5px",
                border: "1px solid #ccc",
                marginBottom: isSignUp ? "10px" : "0",
              }}
            />
            {isSignUp && (
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                style={{
                  padding: "10px",
                  width: "100%",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
            )}
          </div>
          <button
            type="submit"
            style={{
              padding: "10px 20px",
              backgroundColor: "#0a84ff",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              marginBottom: "10px",
            }}
          >
            {isSignUp ? "Sign Up" : "Login"}
          </button>
          <p style={{ fontSize: "14px" }}>
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setIsSignUp(!isSignUp);
              }}
              style={{ color: "#0a84ff", cursor: "pointer" }}
            >
              {isSignUp ? "Login" : "Sign Up"}
            </a>
          </p>
        </form>
        <div
          style={{
            padding: "40px",
            backgroundColor: "#0a84ff",
            color: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h2>WELCOME BACK!</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
        </div>
      </div>
    </div>
  );
}
