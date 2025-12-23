import { View } from "react-native";

const Spacer = ({ width, height }: { width?: number; height?: number }) => {
	return (
		<View
			style={{
				width: width ?? 16,
				height: height ?? 16,
			}}
		/>
	);
};

export default Spacer;
