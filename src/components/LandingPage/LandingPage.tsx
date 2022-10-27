import { Modal } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { useAppSelector } from "../../store/hooks";
import SignInButton from "../SignInButton";

const GradientText = ({
  children,
}: {
  children?: JSX.Element | JSX.Element[] | string;
}) => {
  return (
    <span className=" bg-gradient-to-r bg-clip-text text-transparent from-cyan-500 to-blue-500 ">
      {children}
    </span>
  );
};

export default function LandingPage() {
  const navigate = useNavigate();
  const [modalOpened, modalHandlers] = useDisclosure(false);
  const user = useAppSelector((state) => state.user.user);

  const handleButtonClicked = () => {
    if (user) {
      navigate("main-page");
    } else {
      modalHandlers.open();
    }
  };

  return (
    <>
      <Modal
        centered
        opened={modalOpened}
        onClose={modalHandlers.close}
        title="Please sign-in before you continue"
      >
        <div className="flex justify-center">
          <SignInButton />
        </div>
      </Modal>
      <div className="mx-auto h-screen flex flex-col justify-center items-center bg-gradient-to-b from-slate-800 to-slate-800">
        <h1 className="prose text-3xl leading-loose sm:text-4xl md:text-6xl lg:text-8xl text-slate-50 p-4 text-center">
          {" "}
          Welcome To M4U
          <p>
            <GradientText>Music For You</GradientText>{" "}
          </p>
        </h1>

        <button
          onClick={handleButtonClicked}
          type="button"
          className="text-white 
                        bg-gradient-to-r 
                        from-cyan-500
                        via-cyan-300 
						to-blue-500
                        hover:bg-gradient-to-br 
                        focus:ring-4 
                        focus:outline-none 
                        focus:ring-blue-300 
                        dark:focus:ring-blue-800
                        font-medium 
                        rounded-lg 
                        p-3
                        md:p-5 
                        text-center 
                        m-12
                        text-xl
                        sm:text-2xl
                        md:text-4xl
                        lg:text-6xl"
        >
          {user ? `Welcome back, ${user.displayName}` : "Click Here"}
        </button>
      </div>
    </>
  );
}
