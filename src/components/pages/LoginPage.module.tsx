"use client";

import Link from "next/link";
import Image from "next/image";
import styles from '@styles/components/LoginPage.module.css';
import { useState } from "react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (email == "" || password == "") {
            setError("Please fill in all fields.");
            return;
        }
        setError("");

        console.log("Logging in with:", { email, password }); // temp handling until database is set up
    };

    return (
        <div className={styles.loginContainer}>
            <form onSubmit={handleSubmit} className={styles.loginForm}>
                <h2 className={styles.loginTitle}>Login</h2>

                {error && <p className={styles.loginError}>{error}</p>}

                <div className={styles.formGroup}>
                    <label className={styles.formLabel} htmlFor="email">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        className={styles.formInput}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.formLabel} htmlFor="password">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        className={styles.formInput}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <Link className={styles.forgotPassword} href="/resetPassword">Forgot Password?</Link>

                <button
                    type="submit"
                    className={styles.loginButton}
                >
                    Login
                </button>
            </form>
        </div>
    );
}
