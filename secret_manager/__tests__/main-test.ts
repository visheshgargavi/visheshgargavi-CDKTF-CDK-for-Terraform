import "cdktf/lib/testing/adapters/jest"; 
import { TerraformStack, Testing } from "cdktf";
import { My } from "../main";

    describe("checking for secret name" , () => 
    it("should contain a secret name" , ()=> {
      expect(
        Testing.synthScope((scope) => {
          new My(scope,"my");
          My.name;
        })
    ).toHaveProperty(My.name);
    })
    );

  describe("Checking validity", () => {
     it("check if the produced terraform configuration is valid", () => {
       const app = Testing.app();
       const stack = new TerraformStack(app, "test");
      expect(Testing.fullSynth(stack)).toBeValidTerraform();
     });

     it("check if this can be planned", () => {
       const app = Testing.app();
       const stack = new TerraformStack(app, "test");

      expect(Testing.fullSynth(stack)).toPlanSuccessfully();
     });
   });
