import { signup } from "./actions";
import { login } from "./actions";

const LoginPage: React.FC = () => {
  return (
    <main className="flex min-h-[88vh] flex-col items-center justify-center p-4 bg-neutral">
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
                id="password"
                name="password"
                type="password"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-6 flex gap-1">
              <button className="btn btn-primary" formAction={login}>
                Log in
              </button>
              <button className="btn btn-ghost" formAction={signup}>
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
