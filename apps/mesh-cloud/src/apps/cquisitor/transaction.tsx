import CardSection from "@/components/card-section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DevLayout from "./layout";
import { useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import Metatags from "@/components/site/metatags";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type Budget, type Action, type RedeemerTagType } from "@meshsdk/core";
import { csl } from "@meshsdk/core-csl";

import { getProvider } from "@/lib/provider";
import { TopBar } from "./top-bar";

type ActionSet = {
  [K in RedeemerTagType]: BudgetComparison[];
};

type BudgetComparison = { index: number; expected: Budget; actual: Budget };

const BudgetBar: React.FC<{
  value: number;
  max: number;
  color: string;
}> = ({ value, max, color }) => (
  <div>
    <div className="relative h-4 w-full">
      <div
        className="font-small flex h-full items-center justify-between rounded-full px-2 text-xs"
        style={{
          width: `${(value / max) * 100}%`,
          backgroundColor: color,
          minWidth: "fit-content",
        }}
      >
        <span>{value.toLocaleString()}</span>
      </div>
    </div>
  </div>
);

const ActionSetVisualizer: React.FC<{ actionSets: ActionSet }> = ({
  actionSets,
}) => {
  const tags: RedeemerTagType[] = ["CERT", "MINT", "REWARD", "SPEND"];

  const getMaxMem = (budgetComparison: BudgetComparison[]) => {
    return budgetComparison.reduce((max, set) => {
      return Math.max(max, set.actual.mem, set.expected.mem);
    }, 0);
  };

  const getMaxSteps = (budgetComparison: BudgetComparison[]) => {
    return budgetComparison.reduce((max, set) => {
      return Math.max(max, set.actual.steps, set.expected.steps);
    }, 0);
  };

  return (
    <div className="m-4 grid grid-cols-1 gap-4 md:grid-cols-2">
      {tags.map(
        (tag) =>
          actionSets[tag].length > 0 && (
            <Card key={tag}>
              <CardHeader>
                <CardTitle>{tag}</CardTitle>
              </CardHeader>
              <CardContent>
                {actionSets[tag]?.map((actionSet, index) => {
                  const maxMem = getMaxMem(actionSets[tag]);
                  const maxSteps = getMaxSteps(actionSets[tag]);
                  const isMemUnderBudget =
                    actionSet.actual.mem <= 1.1 * actionSet.expected.mem;
                  const isStepsUnderBudget =
                    actionSet.actual.steps <= 1.1 * actionSet.expected.steps;
                  const memActualColor = isMemUnderBudget ? "red" : "green";
                  const stepsActualColor = isStepsUnderBudget ? "red" : "green";

                  return (
                    <div key={index} className="mb-6 flex flex-col gap-2">
                      <h3 className="mb-2 text-sm font-medium">
                        Index {actionSet.index}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <div className="flex h-10 w-12 items-center justify-center rounded bg-secondary text-xs font-medium text-secondary-foreground">
                          mem
                        </div>
                        <div className="flex h-full w-full flex-col justify-center gap-2">
                          <BudgetBar
                            value={actionSet.expected.mem}
                            max={maxMem}
                            color="gray"
                          />
                          <BudgetBar
                            value={actionSet.actual.mem}
                            max={maxMem}
                            color={memActualColor}
                          />
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="flex h-10 w-12 items-center justify-center rounded bg-secondary text-xs font-medium text-secondary-foreground">
                          steps
                        </div>
                        <div className="flex h-full w-full flex-col justify-center gap-2">
                          <BudgetBar
                            value={actionSet.expected.steps}
                            max={maxSteps}
                            color="gray"
                          />
                          <BudgetBar
                            value={actionSet.actual.steps}
                            max={maxSteps}
                            color={stepsActualColor}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          ),
      )}
    </div>
  );
};

const calculateActionSet = (
  actualRedeemer: Omit<Action, "data">[],
  expectedRedeemer: Omit<Action, "data">[],
): ActionSet => {
  const actionSets: ActionSet = {
    CERT: [],
    MINT: [],
    REWARD: [],
    SPEND: [],
    VOTE: [],
    PROPOSE: [],
  };

  actualRedeemer.forEach((actualAction) => {
    const expectedAction = expectedRedeemer.find(
      (expectedAction) =>
        expectedAction.tag.toLocaleUpperCase() ===
          actualAction.tag.toLocaleUpperCase() &&
        Number(expectedAction.index) === Number(actualAction.index),
    );
    if (!expectedAction) {
      return;
    }

    const budgetComparison: BudgetComparison = {
      index: Number(actualAction.index),
      expected: expectedAction.budget,
      actual: actualAction.budget,
    };

    actionSets[actualAction.tag.toLocaleUpperCase() as RedeemerTagType].push(
      budgetComparison,
    );
  });

  console.log("calculateActionSet", actionSets);

  return actionSets;
};

export default function DevTransaction() {
  const [txHex, setTxHex] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [network, setNetwork] = useState("mainnet");
  const [service, setService] = useState<"blockfrost" | "maestro">(
    "blockfrost",
  );
  const [actualRedeemer, setActualRedeemer] = useState<Omit<Action, "data">[]>(
    [],
  );
  const [expectedRedeemer, setExpectedRedeemer] = useState<
    Omit<Action, "data">[]
  >([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function evaluateTx() {
    setLoading(true);
    const provider = getProvider(service, apiKey, network);
    await provider
      .evaluateTx(txHex)
      .then((res) => {
        console.log("res", res);
        setSuccess(true);
        setExpectedRedeemer(res);
      })
      .catch((err) => {
        setError(JSON.stringify(err));
      });

    // get utxos with provider
    // const utxos = (await provider.fetchUTxOs("", 1)) as cqLib.UTxO[];

    // eval tx with cquisitor

    // log cquisitor result / visualize the message in text box

    setLoading(false);
  }

  const actionSets = calculateActionSet(actualRedeemer, expectedRedeemer);

  useEffect(() => {
    const apiKey = localStorage.getItem("apiKey");
    if (apiKey) setApiKey(apiKey);
    const network = localStorage.getItem("network");
    if (network) setNetwork(network);
  }, []);

  return (
    <DevLayout>
      <Metatags title="Transaction" />
      <TopBar
        network={network}
        setNetwork={setNetwork}
        setService={setService}
        apiKey={apiKey}
        setApiKey={setApiKey}
        loading={loading}
      />
      <>
        <CardSection
          title="Transaction"
          description="Utility to evaluate a transaction for debugging."
          footer={
            !success &&
            !error && (
              <Button onClick={() => evaluateTx()} disabled={loading}>
                Evaluate
              </Button>
            )
          }
        >
          <>
            {error ? (
              <Alert>
                <AlertTitle>Evaluation Result</AlertTitle>
                <AlertDescription className="break-all">
                  <code>{error}</code>
                </AlertDescription>
              </Alert>
            ) : success ? (
              <Alert>
                <div className="flex justify-between">
                  <AlertTitle className="mr-20">Evaluation Result</AlertTitle>
                  <div className="flex gap-2">
                    <div className="relative h-4 w-24">
                      <div
                        className="font-small flex h-full items-center justify-center rounded-full px-2 text-xs"
                        style={{
                          backgroundColor: "gray",
                          minWidth: "fit-content",
                        }}
                      >
                        <span>Eval Result</span>
                      </div>
                    </div>
                    <div className="relative h-4 w-24">
                      <div
                        className="font-small flex h-full items-center justify-center rounded-full px-2 text-xs"
                        style={{
                          backgroundColor: "green",
                          minWidth: "fit-content",
                        }}
                      >
                        <span>👍 Actual</span>
                      </div>
                    </div>
                    <div className="relative h-4 w-24">
                      <div
                        className="font-small flex h-full items-center justify-center rounded-full px-2 text-xs"
                        style={{
                          backgroundColor: "red",
                          minWidth: "fit-content",
                        }}
                      >
                        <span>👎 Actual</span>
                      </div>
                    </div>
                  </div>
                </div>
                <ActionSetVisualizer actionSets={actionSets} />
              </Alert>
            ) : (
              <>
                <div className="grid gap-3">
                  <Label htmlFor="txHex">Transaction hex</Label>
                  <Input
                    id="txHex"
                    placeholder="84......"
                    value={txHex}
                    onChange={(e) => {
                      const cslTx = csl.Transaction.from_hex(e.target.value);
                      const cslRedeemer = cslTx
                        .witness_set()
                        .redeemers()
                        ?.to_json();
                      const parsedActions: any[] = JSON.parse(cslRedeemer!);
                      parsedActions.forEach((action) => {
                        action.budget = {
                          mem: Number(action.ex_units.mem),
                          steps: Number(action.ex_units.steps),
                        };
                        action.tag = (action.tag as string).toLocaleUpperCase();
                      });
                      setActualRedeemer(parsedActions);
                      setTxHex(e.target.value);
                    }}
                    disabled={loading}
                  />
                </div>
              </>
            )}
          </>
        </CardSection>
      </>
    </DevLayout>
  );
}
