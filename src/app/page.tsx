 "use client"
import  MainLayout from "@/app/layouts/MainLayout";
import withAuth from "@/hoc/withAuth";

function Home() {
  return (
    <MainLayout>
      <h1>Home</h1>
    </MainLayout>
  );
}
export default withAuth(Home);
