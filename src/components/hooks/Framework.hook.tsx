import { Framework } from "@/models/interfaces/Framework.interface";
import { GetFrameworks } from "@/services/api/FrameworkAPI";
import { useState, useEffect } from "react";

const useFrameworks = () => {
  const [data, setData] = useState<Framework[]>([]);
  const [nameframework, setNameframework] = useState<string>(data[0]?.Name);
  const [selectedFrameworkDetails, setSelectedFrameworkDetails] = useState(
    data[0]
  );

  const handleGetFrameworks = async () => {
    const result = await GetFrameworks();
    if (result) {
      setData(result.frameworks);
    }
  };

  useEffect(() => {
    handleGetFrameworks();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      setNameframework(data[0]?.Name);
    }
  }, [data]);

  useEffect(() => {
    const frameworkDetails = data.find(
      (framework) => framework.Name === nameframework
    );
    if (frameworkDetails) {
      setSelectedFrameworkDetails(frameworkDetails);
    }
  }, [nameframework]);
  return {
    FrameworkItems: {
      setNameframework,
      data,
      nameframework,
      selectedFrameworkDetails,
    },
  };
};

export default useFrameworks;
