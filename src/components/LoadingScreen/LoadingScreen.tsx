import { Loader } from "@mantine/core";
import { loader } from "../../App";

const LoadingScreen = ({ msg }: { msg: string }) => {
	return (
		<div className="gap-4 flex flex-row h-screen justify-center items-center bg-[#191624] ">
			<Loader size="xl" className="my-auto ml-auto"/>
			<span className="text-lg md:text-2xl bg-[#191624] text-white mr-auto">{msg}</span>
		</div>
	);
};

export const LoaderSong = ({ title } : {title: string}) => (
	<div className="flex justify-center items-center flex-col bg-[#191624] m-auto">
	  <img src={loader} alt="loader" className="w-32 h-32 object-contain" />
	  <h1 className="font-bold text-2xl text-white mt-2">{title || 'Loading'}</h1>
	</div>
  );

export default LoadingScreen;

