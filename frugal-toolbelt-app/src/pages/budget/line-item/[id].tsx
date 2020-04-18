import LineItemPage from ".";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: { id: context.params.id },
  };
};

export default (props: { id: string }) => <LineItemPage {...props} />;
