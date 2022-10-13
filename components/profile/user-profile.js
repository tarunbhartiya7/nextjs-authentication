import ProfileForm from "./profile-form";
import classes from "./user-profile.module.css";
import { signOut } from "next-auth/react";

function UserProfile() {
  // const { data: session } = useSession();
  // const router = useRouter();

  // useEffect(() => {
  //   if (!session) {
  //     router.push("/auth");
  //   }
  // }, [session]);

  async function changePasswordHandler(passwordData) {
    const response = await fetch("/api/auth/change-password", {
      method: "PATCH",
      body: JSON.stringify(passwordData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      signOut();
    }
  }

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm onChangePassword={changePasswordHandler} />
    </section>
  );
}

export default UserProfile;
