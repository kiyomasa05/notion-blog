import React from "react";

type Props = {
  id: string;
  title: string;
  description: string;
  date: string;
  slug: string;
  tag: string;
};

function SinglePost(props: Props) {
  const { title, description, date, slug, tag } = props;
  return <div>{title}</div>;
}

export default SinglePost;
