import { useAuth } from "./Auth";

export default function SessionPage() {
    const { token } = useAuth();
    return (
        <div style={{ color: "white" }}>
            <h1>Session Page</h1>
        </div>
    );
}