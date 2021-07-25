import Header from "../common/Header/header";
import Footer from "../common/Footer/footer";
import Modal from "../AppointmentModal/modal";
import * as React from "react";

const Calendar: React.FC = () => {
	const array = Array(8).fill(0);
	const timeArray = Array(24).fill(-1);
	const indexMapDay: { [x: string]: string } = {
		"0": "GMT+5:45",
		"1": "Sun",
		"2": "Mon",
		"3": "Tue",
		"4": "Wed",
		"5": "Thur",
		"6": " Fri",
		"7": "Sat",
	};

	const [appointmentModal, setAppointmentModal] = React.useState(false);
	const [clientX, setClientX] = React.useState(0);
	const [clientY, setClientY] = React.useState(0);
	const [scrollHeight, setScrollHeight] = React.useState(10);

	const filterEvents = (type: string) => {
		alert(type);
	};

	const showAppointmentModal = () => {
		const element = document.getElementsByClassName(
			"appointmentModal_container"
		) as HTMLCollectionOf<HTMLElement>;
		element[0].style.display = "block";
		if (clientX < 500) {
			element[0].style.left = "60%";
		}
		if (clientX > 500) {
			element[0].style.left = "30%";
		}
		if (clientY > 500) {
			element[0].style.top = (clientY - 300).toString();
		}
	};

	const hideAppointmentModal = () => {
		const element = document.getElementsByClassName(
			"appointmentModal_container"
		) as HTMLCollectionOf<HTMLElement>;
		element[0].style.display = "none";
	};

	const scrollTimeDiv = () => {
		console.log("called scroll");
		setScrollHeight((prevState: number) => prevState + 10);
		const element = document.getElementsByClassName(
			"calendar-left-area"
		) as HTMLCollectionOf<HTMLElement>;
		element[0].scroll(0, scrollHeight);
	};

	React.useEffect(() => {
		// setTimeout(() => scrollTimeDiv(), 5000);
		const buttons = document.getElementsByClassName(
			"calendar-time-row-button"
		) as HTMLCollectionOf<HTMLElement>;
		Array.from(buttons).forEach((button) =>
			button.addEventListener("click", getCoord)
		);
	}, [scrollHeight]);

	const getCoord = (event: MouseEvent) => {
		setClientX(event.clientX);
		setClientY(event.clientY);
	};

	return (
		<>
			<Header />
			<div className="calendar-container">
				<div className="calendar-right-area">
					<div className="calendar-event-type-selector">
						<form className="calendar-event-type-form">
							<div className="event-type">
								<label>Birthday</label>
								<input
									type="checkbox"
									id="birthday"
									name="Birthday"
									value="Birthday"
									onChange={() => filterEvents("birthday")}
								/>
							</div>
							<div>
								<label>Reminder</label>
								<input
									type="checkbox"
									id="reminder"
									name="Reminder"
									value="Reminder"
									onChange={() => filterEvents("birthday")}
								/>
							</div>
							<div>
								<label>Meetings</label>
								<input
									type="checkbox"
									id="meeting"
									name="Meeting"
									value="Meeting"
									onChange={() => filterEvents("birthday")}
								/>
							</div>
						</form>
					</div>
				</div>
				<div className="calendar-left-area">
					{array.map((item, index1) => (
						<div key={item} className="calendar-week-column">
							<div className="calendar-week-Name">{indexMapDay[index1]}</div>
							{timeArray.map((time, index) => (
								<div className="calendar-time-row">
									<button
										className="calendar-time-row-button"
										onClick={() => showAppointmentModal()}
									>
										{index1 === 0 &&
											(index % 12 === 0
												? index < 12
													? "12 AM"
													: "12 PM"
												: index < 12
												? `${index % 12} AM`
												: `${index % 12} PM`)}
									</button>
								</div>
							))}
						</div>
					))}
				</div>
			</div>
			<Footer />
			{<Modal closeModal={hideAppointmentModal} />}
		</>
	);
};

export default Calendar;
