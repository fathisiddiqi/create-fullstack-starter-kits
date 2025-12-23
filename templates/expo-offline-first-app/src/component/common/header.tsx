import { Text, View } from "react-native";
import { Color } from "@theme/color";
import { ReactNode } from "react";

const Header = ({
	title,
	rightComponent,
}: {
	title: string;
	rightComponent?: ReactNode;
}) => {
	return (
		<View
			style={{
				paddingTop: 20,
				paddingHorizontal: 16,
				backgroundColor: Color.surface,
				borderBottomWidth: 1,
				borderBottomColor: "#E5E5E5",
				flexDirection: "row",
				alignItems: "center",
				justifyContent: "space-between",
			}}
		>
			<Text
				style={{
					fontSize: 20,
					fontWeight: "600",
					color: Color.onSurface,
					textAlign: "center",
					flex: 1,
				}}
			>
				{title}
			</Text>
			{rightComponent}
		</View>
	);
};

export { Header };
