import React from "react";
import Link from "next/link";
const SignupPage: React.FC = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Rejestracja</h2>
          <form>
            <div className="flex flex-col gap-1">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email@example.com"
                className="input input-bordered"
                required
              />
              <label className="label">
                <span className="label-text">Nazwa użytkownika</span>
              </label>
              <input
                type="text"
                name="username"
                placeholder="Nazwa użytkownika"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-6 flex gap-1">
              <button type="submit" className="btn btn-primary">
                Zarejestruj się
              </button>
              <Link href="/login" className="btn btn-ghost">
                Zaloguj się
              </Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default SignupPage;
