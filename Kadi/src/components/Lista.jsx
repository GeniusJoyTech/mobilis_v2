import React from "react";
import ItemLista from "./ItemLista";

const Lista = ({ data, id }) => {
  return (
    <>
      {data.map((item) => (
        <ItemLista key={item[id]} item={item} id={id} />
      ))}
    </>
  );
};

export default Lista;
