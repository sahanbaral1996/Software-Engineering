interface ITextDiv {
	Reply: string;
	type: string;
}

const TextDiv: React.FC<ITextDiv> = ({ Reply, type }) => {
	const class_name = type === "sent" ? "text-right" : "text-left";

	return (
		<div className="text-div-container">
			<div className={class_name}>{Reply}</div>
		</div>
	);
};

export default TextDiv;
