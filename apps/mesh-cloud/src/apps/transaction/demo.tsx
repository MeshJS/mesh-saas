import CardSection from "@/components/card-section";
import Metatags from "@/components/site/metatags";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import TransactionLayout from "./layout";
import axios from "axios";

export default function DemoAPI() {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const runAPIDemo = async () => {
    setLoading(true);
    try {
      const res = await axios.post("https://localhost:8080/api/demo", {
        input,
      });
      const data = res.data;
      setSuccess(data);
    } catch (error) {
      setError("Error: ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <TransactionLayout>
      <Metatags title="Demo" />
      <CardSection
        title="API Demo"
        description="API to build transaction"
        footer={
          !success &&
          !error && (
            <Button onClick={() => runAPIDemo()} disabled={loading}>
              Run API
            </Button>
          )
        }
      >
        <>
          {error ? (
            <Alert>
              <AlertTitle>API Error</AlertTitle>
              <AlertDescription className="break-all">
                <code>{error}</code>
              </AlertDescription>
            </Alert>
          ) : success ? (
            <Alert>
              <AlertTitle>API Result</AlertTitle>
              <AlertDescription className="break-all">
                <code>{success}</code>
              </AlertDescription>
            </Alert>
          ) : (
            <div className="grid gap-3">
              <Label htmlFor="input">API Input</Label>
              <Input
                id="input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={loading}
              />
            </div>
          )}
        </>
      </CardSection>
    </TransactionLayout>
  );
}
