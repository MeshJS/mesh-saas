import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { JsonViewer } from "@textea/json-viewer";
import { useState } from "react";

export const getWarningTitle = (key: string | object) => {
  let warningKey = "";

  if (typeof key === "string") {
    warningKey = key;
  } else if (key && typeof key === "object") {
    warningKey = Object.keys(key)[0] || "";
  }

  switch (warningKey) {
    case "InputsAreNotSorted":
      return "Inputs are not sorted";

    case "CollateralIsUnnecessary":
      return "Collateral is unnecessary";

    case "TotalCollateralIsNotDeclared":
      return "Total collateral is not declared";

    case "FeeIsBiggerThanMinFee":
      return "Fee is bigger than minimum fee";

    case "InputUsesRewardAddress":
      return "Input uses reward address";

    case "CollateralInputUsesRewardAddress":
      return "Collateral input uses reward address";

    case "CannotCheckStakeDeregistrationRefund":
      return "Cannot check stake deregistration refund";

    case "CannotCheckDRepDeregistrationRefund":
      return "Cannot check DRep deregistration refund";

    case "PoolAlreadyRegistered":
      return "Pool already registered";

    case "DRepAlreadyRegistered":
      return "DRep already registered";

    case "CommitteeAlreadyAuthorized":
      return "Committee already authorized";

    case "DRepNotRegistered":
      return "DRep not registered";

    case "DuplicateRegistrationInTx":
      return "Duplicate registration in transaction";

    case "DuplicateCommitteeColdResignationInTx":
      return "Duplicate committee cold resignation in transaction";

    case "DuplicateCommitteeHotRegistrationInTx":
      return "Duplicate committee hot registration in transaction";

    default:
      return warningKey || "Warning";
  }
};

export function Phase1WarningSection({ warnings }: { warnings: any[] }) {
  return (
    <Alert style={{ backgroundColor: "rgba(255, 140, 0, 0.3)" }}>
      <AlertTitle>Phase 1 Warnings found: {warnings.length}</AlertTitle>
      <br />
      {warnings.map((warning, idx) => (
        <Phase1Warning key={idx} warning={warning} idx={idx} />
      ))}
    </Alert>
  );
}

export function Phase1Warning({ warning, idx }: { warning: any; idx: number }) {
  const [showJsonIdx, setShowJsonIdx] = useState<number | null>(null);

  return (
    <>
      <Alert>
        <AlertTitle
          style={{
            color: "rgb(255,140,0)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span>{getWarningTitle(warning.warning)}</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowJsonIdx(showJsonIdx === idx ? null : idx)}
            style={{
              marginTop: 0,
              marginLeft: 8,
              color: "white",
            }}
          >
            {showJsonIdx === idx ? "Hide details" : "Show details"}
          </Button>
        </AlertTitle>
        <br />
        {showJsonIdx === idx && (
          <>
            <JsonViewer
              sx={{ fontSize: 14 }}
              value={warning.warning}
              theme="dark"
              quotesOnKeys={false}
              displayDataTypes={false}
              rootName={false}
            />
            <br />
          </>
        )}
        <Alert>
          <AlertTitle>Locations:</AlertTitle>
          <AlertDescription>{warning.locations}</AlertDescription>
        </Alert>
        <br />
        <Alert>
          <AlertTitle>Hint:</AlertTitle>
          <AlertDescription>{warning.hint}</AlertDescription>
        </Alert>
      </Alert>
      <br />
    </>
  );
}

/* warning types from cqLib
"InputsAreNotSorted" | "CollateralIsUnnecessary" | "TotalCollateralIsNotDeclared")
  | {
      FeeIsBiggerThanMinFee: {
        actual_fee: bigint;
        fee_decomposition: FeeDecomposition;
        min_fee: bigint;
      };
    }
  | {
      InputUsesRewardAddress: {
        invalid_input: string;
      };
    }
  | {
      CollateralInputUsesRewardAddress: {
        invalid_collateral: string;
      };
    }
  | {
      CannotCheckStakeDeregistrationRefund: {
        cert_index: number;
      };
    }
  | {
      CannotCheckDRepDeregistrationRefund: {
        cert_index: number;
      };
    }
  | {
      PoolAlreadyRegistered: {
        pool_id: string;
      };
    }
  | {
      DRepAlreadyRegistered: {
        drep_id: string;
      };
    }
  | {
      CommitteeAlreadyAuthorized: {
        committee_key: string;
      };
    }
  | {
      DRepNotRegistered: {
        cert_index: number;
      };
    }
  | {
      DuplicateRegistrationInTx: {
        cert_index: number;
        entity_id: string;
        entity_type: string;
      };
    }
  | {
      DuplicateCommitteeColdResignationInTx: {
        cert_index: number;
        committee_credential: LocalCredential;
      };
    }
  | {
      DuplicateCommitteeHotRegistrationInTx: {
        cert_index: number;
        committee_credential: LocalCredential;
      };
    };
    */
