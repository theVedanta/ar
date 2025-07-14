export default function ForgotPasswordPage() {
    return (
        <div className="flex flex-col items-center mt-12">
            <h2 className="text-2xl font-semibold mb-2">Forgot Password</h2>
            <p className="text-muted-foreground mb-6">
                Please enter your email address to reset your password.
            </p>
            <form className="w-full max-w-sm space-y-4">
                <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-sm font-medium">
                        Email address
                    </label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email address"
                        className="border border-input rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary transition w-full"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-primary text-primary-foreground py-2 rounded-md font-medium hover:bg-primary/90 transition"
                >
                    Send Reset Link
                </button>
            </form>
        </div>
    );
}
