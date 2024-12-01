import React from "react";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale"; // Importation pour les formats français

const PostDate = ({ date }) => {
  const relativeDate = formatDistanceToNow(new Date(date), { locale: fr }); // Formate en français
  return <span>Posté il y a {relativeDate}</span>;
};

export default PostDate;
