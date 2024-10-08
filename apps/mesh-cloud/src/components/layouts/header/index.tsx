import { CardanoWallet } from "@meshsdk/react";
import Nav from "./nav";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useValidateStaking } from "@/hooks/useValidateStaking";
import { CheckCircledIcon, CrossCircledIcon } from "@radix-ui/react-icons";
import { Label } from "@/components/ui/label";

export default function Header() {
  const {
    rewardAddress,
    isStaked,
    isDRepDelegated,
    delegateDRep,
    stakeToPool,
  } = useValidateStaking();

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <Nav />
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form className="ml-auto flex-1 sm:flex-initial">
          <div className="relative flex items-center gap-4">
            {/* <Search className="text-muted-foreground absolute left-2.5 top-2.5 h-4 w-4" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
            /> */}

            {rewardAddress && (
              <>
                {isStaked ? (
                  <Label className="flex items-center gap-2">
                    <CheckCircledIcon className="h-6 w-6" />
                    <p>Staked</p>
                  </Label>
                ) : (
                  <Button
                    type="button"
                    onClick={stakeToPool}
                    variant={"ghost"}
                    className="flex items-center gap-2"
                  >
                    <CrossCircledIcon className="h-6 w-6" />
                    <p>Not Staked</p>
                  </Button>
                )}

                {isDRepDelegated ? (
                  <Label className="flex items-center gap-2">Delegated</Label>
                ) : (
                  <Button
                    type="button"
                    onClick={delegateDRep}
                    variant={"ghost"}
                    className="flex items-center gap-2"
                  >
                    <CrossCircledIcon className="h-6 w-6" />
                    <p>Vote Not Delegated</p>
                  </Button>
                )}
              </>
            )}

            <CardanoWallet isDark={true} />
          </div>
        </form>
      </div>
    </header>
  );
}
