import { NextPage } from "next";
import CreateManufacturer from "../../../components/manufacturer/add-new/createManufacturer";
const CreateManufacturerPage: NextPage = () => {
  return (
    <>
      <div className="px-5 mt-2">
        <CreateManufacturer />
      </div>
    </>
  );
};

export default CreateManufacturerPage;