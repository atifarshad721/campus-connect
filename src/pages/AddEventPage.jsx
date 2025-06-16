import EventHeader from "../components/EventHeader";
import EventForm from "../components/EventForm";

function AddEventPage() {
  return (
    <main
      style={{
        background: "linear-gradient(to bottom, #eff6ff, #ffffff)",
      }}
    >
      <EventHeader isAdd={true}/>
      <EventForm isEditMode={false} />
    </main>
  );
}

export default AddEventPage;
