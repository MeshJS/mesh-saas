import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type Dispatch, type SetStateAction } from "react";
import { Input } from "@/components/ui/input";

export function TopBar({
  network,
  setNetwork,
  setService,
  apiKey,
  setApiKey,
  loading,
}: {
  network: string;
  setNetwork: Dispatch<SetStateAction<string>>;
  setService: Dispatch<SetStateAction<any>>;
  apiKey: string;
  setApiKey: Dispatch<SetStateAction<string>>;
  loading: boolean;
}) {
  const cacheApiKey = (apiKey: string) => {
    localStorage.setItem("apiKey", apiKey);
  };

  return (
    <div className="flex flex-row gap-4">
      <SelectNetwork
        placeholder={network[0]?.toLocaleUpperCase() + network.slice(1)}
        setValue={setNetwork}
      />
      <SelectService setValue={setService} />
      <div className="grid w-[300px] gap-3">
        <Input
          id="apiKey"
          value={apiKey}
          onChange={(e) => {
            cacheApiKey(e.target.value);
            setApiKey(e.target.value);
          }}
          disabled={loading}
          type="password"
          placeholder="API Key"
        />
      </div>
    </div>
  );
}

export function SelectNetwork({
  setValue,
  placeholder,
  simplified = false,
}: {
  setValue: Dispatch<SetStateAction<any>>;
  placeholder?: string;
  simplified?: boolean;
}) {
  const cacheNetwork = (apiKey: string) => {
    localStorage.setItem("network", apiKey);
  };

  return (
    <Select
      onValueChange={(value) => {
        setValue(value);
        cacheNetwork(value);
      }}
    >
      <SelectTrigger className="w-[240px]">
        <SelectValue placeholder={placeholder ?? "Select a Network"} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="mainnet">Mainnet</SelectItem>
          {simplified ? (
            <SelectItem value="testnet">Testnet</SelectItem>
          ) : (
            <>
              <SelectItem value="preprod">Preprod</SelectItem>
              <SelectItem value="preview">Preview</SelectItem>
            </>
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export function SelectService({
  setValue,
}: {
  setValue: Dispatch<SetStateAction<any>>;
}) {
  return (
    <Select onValueChange={setValue}>
      <SelectTrigger className="w-[240px]">
        <SelectValue placeholder="Select a Provider" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="blockfrost">Blockfrost</SelectItem>
          <SelectItem value="maestro">Maestro</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
