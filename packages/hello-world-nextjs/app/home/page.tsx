// import { useState } from "react";

export default ({
  searchParams: { token },
}: {
  searchParams: { token: string };
}) => {
//   useEffect(() => {
//     console.log("CLIENT SIDE");
//   });

  console.log(token);
  return <h1>home page</h1>;
};
