import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { JsonViewer } from "@textea/json-viewer";

export const getErrorTitle = (key: string | object) => {
  let errorKey = "";

  if (typeof key === "string") {
    errorKey = key;
  } else if (key && typeof key === "object") {
    errorKey = Object.keys(key)[0] || "";
  }

  switch (errorKey) {
    case "GenesisKeyDelegationCertificateIsNotSupported":
      return "Genesis key delegation certificate is not supported";

    case "MoveInstantaneousRewardsCertificateIsNotSupported":
      return "Move instantaneous rewards certificate is not supported";

    case "BadInputsUTxO":
      return "Bad inputs in UTxO";

    case "OutsideValidityIntervalUTxO":
      return "Transaction is outside validity interval";

    case "MaxTxSizeUTxO":
      return "Transaction size exceeds maximum allowed";

    case "InputSetEmptyUTxO":
      return "Input set is empty";

    case "FeeTooSmallUTxO":
      return "Fee is too small";

    case "ValueNotConservedUTxO":
      return "Value not conserved in UTxO";

    case "WrongNetwork":
      return "Wrong network";

    case "WrongNetworkWithdrawal":
      return "Wrong network withdrawal";

    case "WrongNetworkInTxBody":
      return "Wrong network in transaction body";

    case "OutputTooSmallUTxO":
      return "Output too small in UTxO";

    case "CollateralReturnTooSmall":
      return "Collateral return too small";

    case "OutputBootAddrAttrsTooBig":
      return "Output bootstrap address attributes too big";

    case "OutputTooBigUTxO":
      return "Output too big in UTxO";

    case "InsufficientCollateral":
      return "Insufficient collateral";

    case "ExUnitsTooBigUTxO":
      return "Execution units too big in UTxO";

    case "CalculatedCollateralContainsNonAdaAssets":
      return "Calculated collateral contains non-ADA assets";

    case "CollateralInputContainsNonAdaAssets":
      return "Collateral input contains non-ADA assets";

    case "CollateralIsLockedByScript":
      return "Collateral is locked by script";

    case "TooManyCollateralInputs":
      return "Too many collateral inputs";

    case "NoCollateralInputs":
      return "No collateral inputs";

    case "IncorrectTotalCollateralField":
      return "Incorrect total collateral field";

    case "InvalidSignature":
      return "Invalid signature";

    case "ExtraneousSignature":
      return "Extraneous signature";

    case "NativeScriptIsUnsuccessful":
      return "Native script is unsuccessful";

    case "PlutusScriptIsUnsuccessful":
      return "Plutus script is unsuccessful";

    case "MissingVKeyWitnesses":
      return "Missing VKey witnesses";

    case "MissingScriptWitnesses":
      return "Missing script witnesses";

    case "MissingRedeemer":
      return "Missing redeemer";

    case "MissingTxBodyMetadataHash":
      return "Missing transaction body metadata hash";

    case "MissingTxMetadata":
      return "Missing transaction metadata";

    case "ConflictingMetadataHash":
      return "Conflicting metadata hash";

    case "InvalidMetadata":
      return "Invalid metadata";

    case "ExtraneousScriptWitnesses":
      return "Extraneous script witnesses";

    case "StakeAlreadyRegistered":
      return "Stake already registered";

    case "StakeNotRegistered":
      return "Stake not registered";

    case "StakeNonZeroAccountBalance":
      return "Stake account balance is non-zero";

    case "RewardAccountNotExisting":
      return "Reward account does not exist";

    case "WrongRequestedWithdrawalAmount":
      return "Wrong requested withdrawal amount";

    case "StakePoolNotRegistered":
      return "Stake pool not registered";

    case "WrongRetirementEpoch":
      return "Wrong retirement epoch";

    case "StakePoolCostTooLow":
      return "Stake pool cost too low";

    case "InsufficientFundsForMir":
      return "Insufficient funds for MIR";

    case "InvalidCommitteeVote":
      return "Invalid committee vote";

    case "DRepIncorrectDeposit":
      return "DRep incorrect deposit";

    case "DRepDeregistrationWrongRefund":
      return "DRep deregistration wrong refund";

    case "StakeRegistrationWrongDeposit":
      return "Stake registration wrong deposit";

    case "StakeDeregistrationWrongRefund":
      return "Stake deregistration wrong refund";

    case "PoolRegistrationWrongDeposit":
      return "Pool registration wrong deposit";

    case "CommitteeHasPreviouslyResigned":
      return "Committee has previously resigned";

    case "TreasuryValueMismatch":
      return "Treasury value mismatch";

    case "RefScriptsSizeTooBig":
      return "Reference scripts size too big";

    case "WithdrawalNotAllowedBecauseNotDelegatedToDRep":
      return "Withdrawal not allowed because not delegated to DRep";

    case "CommitteeIsUnknown":
      return "Committee is unknown";

    case "GovActionsDoNotExist":
      return "Governance actions do not exist";

    case "MalformedProposal":
      return "Malformed proposal";

    case "ProposalProcedureNetworkIdMismatch":
      return "Proposal procedure network ID mismatch";

    case "TreasuryWithdrawalsNetworkIdMismatch":
      return "Treasury withdrawals network ID mismatch";

    case "VotingProposalIncorrectDeposit":
      return "Voting proposal incorrect deposit";

    case "DisallowedVoters":
      return "Disallowed voters";

    case "ConflictingCommitteeUpdate":
      return "Conflicting committee update";

    case "ExpirationEpochTooSmall":
      return "Expiration epoch too small";

    case "InvalidPrevGovActionId":
      return "Invalid previous governance action ID";

    case "VotingOnExpiredGovAction":
      return "Voting on expired governance action";

    case "ProposalCantFollow":
      return "Proposal can't follow";

    case "InvalidConstitutionPolicyHash":
      return "Invalid constitution policy hash";

    case "VoterDoNotExist":
      return "Voter does not exist";

    case "ZeroTreasuryWithdrawals":
      return "Zero treasury withdrawals";

    case "ProposalReturnAccountDoesNotExist":
      return "Proposal return account does not exist";

    case "TreasuryWithdrawalReturnAccountsDoNotExist":
      return "Treasury withdrawal return accounts do not exist";

    case "AuxiliaryDataHashMismatch":
      return "Auxiliary data hash mismatch";

    case "AuxiliaryDataHashMissing":
      return "Auxiliary data hash missing";

    case "AuxiliaryDataHashPresentButNotExpected":
      return "Auxiliary data hash present but not expected";

    case "UnknownError":
      return "Unknown error";

    case "MissingDatum":
      return "Missing datum";

    case "ExtraneousDatumWitnesses":
      return "Extraneous datum witnesses";

    case "ScriptDataHashMismatch":
      return "Script data hash mismatch";

    default:
      return errorKey || "Unknown Error";
  }
};

export function Phase1ErrorSection({ errors }: { errors: any[] }) {
  return (
    <Alert style={{ backgroundColor: "rgba(147, 30, 30, 0.3)" }}>
      <AlertTitle>Phase 1 Errors found: {errors.length}</AlertTitle>
      <br />
      {errors.map((error, idx) => (
        <Phase1Error key={idx} error={error} idx={idx} />
      ))}
    </Alert>
  );
}

export function Phase1Error({ error, idx }: { error: any; idx: number }) {
  const [showJsonIdx, setShowJsonIdx] = useState<number | null>(null);

  return (
    <>
      <Alert>
        <AlertTitle
          style={{
            color: "rgb(200, 0, 0)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span>{getErrorTitle(error.error)}</span>
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
              value={error.error}
              theme="dark"
              quotesOnKeys={false}
              displayDataTypes={false}
              rootName={false}
            />
            <br />
          </>
        )}
        <Alert>
          <AlertTitle>Hint:</AlertTitle>
          <AlertDescription>{error.hint}</AlertDescription>
        </Alert>
      </Alert>
      <br />
    </>
  );
}

// error types from cquisitor lib
// GenesisKeyDelegationCertificateIsNotSupported
//       | "MoveInstantaneousRewardsCertificateIsNotSupported"
//     )
//   | {
//       BadInputsUTxO: {
//         invalid_input: TxInput;
//       };
//     }
//   | {
//       OutsideValidityIntervalUTxO: {
//         current_slot: bigint;
//         interval_end: bigint;
//         interval_start: bigint;
//       };
//     }
//   | {
//       MaxTxSizeUTxO: {
//         actual_size: bigint;
//         max_size: bigint;
//       };
//     }
//   | "InputSetEmptyUTxO"
//   | {
//       FeeTooSmallUTxO: {
//         actual_fee: bigint;
//         fee_decomposition: FeeDecomposition;
//         min_fee: bigint;
//       };
//     }
//   | {
//       ValueNotConservedUTxO: {
//         difference: Value;
//         input_sum: Value;
//         output_sum: Value;
//       };
//     }
//   | {
//       WrongNetwork: {
//         wrong_addresses: string[];
//       };
//     }
//   | {
//       WrongNetworkWithdrawal: {
//         wrong_addresses: string[];
//       };
//     }
//   | {
//       WrongNetworkInTxBody: {
//         actual_network: number;
//         expected_network: number;
//       };
//     }
//   | {
//       OutputTooSmallUTxO: {
//         min_amount: number;
//         output_amount: number;
//       };
//     }
//   | {
//       CollateralReturnTooSmall: {
//         min_amount: number;
//         output_amount: number;
//       };
//     }
//   | {
//       OutputBootAddrAttrsTooBig: {
//         actual_size: bigint;
//         max_size: bigint;
//         output: unknown;
//       };
//     }
//   | {
//       OutputTooBigUTxO: {
//         actual_size: bigint;
//         max_size: bigint;
//       };
//     }
//   | {
//       InsufficientCollateral: {
//         required_collateral: number;
//         total_collateral: number;
//       };
//     }
//   | {
//       ExUnitsTooBigUTxO: {
//         actual_memory_units: bigint;
//         actual_steps_units: bigint;
//         max_memory_units: bigint;
//         max_steps_units: bigint;
//       };
//     }
//   | "CalculatedCollateralContainsNonAdaAssets"
//   | {
//       CollateralInputContainsNonAdaAssets: {
//         collateral_input: string;
//       };
//     }
//   | {
//       CollateralIsLockedByScript: {
//         invalid_collateral: string;
//       };
//     }
//   | {
//       TooManyCollateralInputs: {
//         actual_count: number;
//         max_count: number;
//       };
//     }
//   | "NoCollateralInputs"
//   | {
//       IncorrectTotalCollateralField: {
//         actual_sum: number;
//         declared_total: number;
//       };
//     }
//   | {
//       InvalidSignature: {
//         invalid_signature: string;
//       };
//     }
//   | {
//       ExtraneousSignature: {
//         extraneous_signature: string;
//       };
//     }
//   | {
//       NativeScriptIsUnsuccessful: {
//         native_script_hash: string;
//       };
//     }
//   | {
//       PlutusScriptIsUnsuccessful: {
//         plutus_script_hash: string;
//       };
//     }
//   | {
//       MissingVKeyWitnesses: {
//         missing_key_hash: string;
//       };
//     }
//   | {
//       MissingScriptWitnesses: {
//         missing_script_hash: string;
//       };
//     }
//   | {
//       MissingRedeemer: {
//         index: number;
//         tag: string;
//       };
//     }
//   | "MissingTxBodyMetadataHash"
//   | "MissingTxMetadata"
//   | {
//       ConflictingMetadataHash: {
//         actual_hash: string;
//         expected_hash: string;
//       };
//     }
//   | {
//       InvalidMetadata: {
//         message: string;
//       };
//     }
//   | {
//       ExtraneousScriptWitnesses: {
//         extraneous_script: string;
//       };
//     }
//   | {
//       StakeAlreadyRegistered: {
//         reward_address: string;
//       };
//     }
//   | {
//       StakeNotRegistered: {
//         reward_address: string;
//       };
//     }
//   | {
//       StakeNonZeroAccountBalance: {
//         remaining_balance: bigint;
//         reward_address: string;
//       };
//     }
//   | {
//       RewardAccountNotExisting: {
//         reward_address: string;
//       };
//     }
//   | {
//       WrongRequestedWithdrawalAmount: {
//         expected_amount: number;
//         requested_amount: bigint;
//         reward_address: string;
//       };
//     }
//   | {
//       StakePoolNotRegistered: {
//         pool_id: string;
//       };
//     }
//   | {
//       WrongRetirementEpoch: {
//         current_epoch: bigint;
//         max_epoch: bigint;
//         min_epoch: bigint;
//         specified_epoch: bigint;
//       };
//     }
//   | {
//       StakePoolCostTooLow: {
//         min_cost: bigint;
//         specified_cost: bigint;
//       };
//     }
//   | {
//       InsufficientFundsForMir: {
//         available_amount: bigint;
//         requested_amount: bigint;
//       };
//     }
//   | {
//       InvalidCommitteeVote: {
//         message: string;
//         voter: unknown;
//       };
//     }
//   | {
//       DRepIncorrectDeposit: {
//         cert_index: number;
//         required_deposit: number;
//         supplied_deposit: number;
//       };
//     }
//   | {
//       DRepDeregistrationWrongRefund: {
//         cert_index: number;
//         required_refund: number;
//         supplied_refund: number;
//       };
//     }
//   | {
//       StakeRegistrationWrongDeposit: {
//         cert_index: number;
//         required_deposit: number;
//         supplied_deposit: number;
//       };
//     }
//   | {
//       StakeDeregistrationWrongRefund: {
//         cert_index: number;
//         required_refund: number;
//         supplied_refund: number;
//       };
//     }
//   | {
//       PoolRegistrationWrongDeposit: {
//         cert_index: number;
//         required_deposit: number;
//         supplied_deposit: number;
//       };
//     }
//   | {
//       CommitteeHasPreviouslyResigned: {
//         committee_credential: LocalCredential;
//       };
//     }
//   | {
//       TreasuryValueMismatch: {
//         actual_value: bigint;
//         declared_value: bigint;
//       };
//     }
//   | {
//       RefScriptsSizeTooBig: {
//         actual_size: bigint;
//         max_size: bigint;
//       };
//     }
//   | {
//       WithdrawalNotAllowedBecauseNotDelegatedToDRep: {
//         reward_address: string;
//       };
//     }
//   | {
//       CommitteeIsUnknown: {
//         /**
//          * The committee key hash

//         committee_key_hash:
//           | {
//               keyHash: number[];
//             }
//           | {
//               scriptHash: number[];
//             };
//       };
//     }
//   | {
//       GovActionsDoNotExist: {
//         /**
//          * The list of invalid governance action IDs
//          */
//         invalid_action_ids: GovernanceActionId[];
//       };
//     }
//   | {
//       MalformedProposal: {
//         gov_action: GovernanceActionId;
//       };
//     }
//   | {
//       ProposalProcedureNetworkIdMismatch: {
//         /**
//          * The expected network ID
//          */
//         expected_network: number;
//         /**
//          * The reward account
//          */
//         reward_account: string;
//       };
//     }
//   | {
//       TreasuryWithdrawalsNetworkIdMismatch: {
//         /**
//          * The expected network ID
//          */
//         expected_network: number;
//         /**
//          * The set of mismatched reward accounts
//          */
//         mismatched_account: string;
//       };
//     }
//   | {
//       VotingProposalIncorrectDeposit: {
//         proposal_index: number;
//         /**
//          * The required deposit amount
//          */
//         required_deposit: number;
//         /**
//          * The supplied deposit amount
//          */
//         supplied_deposit: number;
//       };
//     }
//   | {
//       DisallowedVoters: {
//         /**
//          * List of disallowed voter and action ID pairs
//          */
//         disallowed_pairs: [unknown, unknown][];
//       };
//     }
//   | {
//       ConflictingCommitteeUpdate: {
//         /**
//          * The set of conflicting credentials
//          */
//         conflicting_credentials:
//           | {
//               keyHash: number[];
//             }
//           | {
//               scriptHash: number[];
//             };
//       };
//     }
//   | {
//       ExpirationEpochTooSmall: {
//         /**
//          * Map of credentials to their invalid expiration epochs
//          */
//         invalid_expirations: {
//           [k: string]: number;
//         };
//       };
//     }
//   | {
//       InvalidPrevGovActionId: {
//         /**
//          * The invalid proposal
//          */
//         proposal: {
//           [k: string]: unknown;
//         };
//       };
//     }
//   | {
//       VotingOnExpiredGovAction: {
//         expired_gov_action: GovernanceActionId;
//       };
//     }
//   | {
//       ProposalCantFollow: {
//         /**
//          * The expected protocol version
//          */
//         expected_versions: ProtocolVersion[];
//         /**
//          * Previous governance action ID
//          */
//         prev_gov_action_id?: GovernanceActionId | null;
//         supplied_version: ProtocolVersion;
//       };
//     }
//   | {
//       InvalidConstitutionPolicyHash: {
//         /**
//          * The expected policy hash
//          */
//         expected_hash?: string | null;
//         /**
//          * The supplied policy hash
//          */
//         supplied_hash?: string | null;
//       };
//     }
//   | {
//       VoterDoNotExist: {
//         /**
//          * List of non-existent voters
//          */
//         missing_voter: {
//           [k: string]: unknown;
//         };
//       };
//     }
//   | {
//       ZeroTreasuryWithdrawals: {
//         gov_action: GovernanceActionId;
//       };
//     }
//   | {
//       ProposalReturnAccountDoesNotExist: {
//         /**
//          * The invalid return account
//          */
//         return_account: string;
//       };
//     }
//   | {
//       TreasuryWithdrawalReturnAccountsDoNotExist: {
//         /**
//          * List of non-existent return accounts
//          */
//         missing_account: string;
//       };
//     }
//   | {
//       AuxiliaryDataHashMismatch: {
//         /**
//          * The actual auxiliary data hash
//          */
//         actual_hash?: string | null;
//         /**
//          * The expected auxiliary data hash
//          */
//         expected_hash: string;
//       };
//     }
//   | "AuxiliaryDataHashMissing"
//   | "AuxiliaryDataHashPresentButNotExpected"
//   | {
//       UnknownError: {
//         message: string;
//       };
//     }
//   | {
//       MissingDatum: {
//         datum_hash: string;
//       };
//     }
//   | {
//       ExtraneousDatumWitnesses: {
//         datum_hash: string;
//       };
//     }
//   | {
//       ScriptDataHashMismatch: {
//         /**
//          * The expected script data hash
//          */
//         expected_hash?: string | null;
//         /**
//          * The actual script data hash
//          */
//         provided_hash?: string | null;
//       };
//     };
//     */
