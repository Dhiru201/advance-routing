import { useLoaderData, json, defer, Await } from "react-router-dom";
import EventsList from "../EventsList";
import { Suspense } from "react";

function EventsPage() {
  const { events } = useLoaderData();

  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
      <Await resolve={events}>
        {(loadedEvent) => <EventsList events={loadedEvent} />}
      </Await>
    </Suspense>
  );
}

export default EventsPage;

async function loadEvents() {
  const response = await fetch("http://localhost:8080/events");
  // incorrect rezsponse case ...
  if (!response.ok) {
    return { isError: true, message: "Could not fetch events." };
  } else {
    const resData = await response.json();
    return resData.events;
  }
}

export function eventsLoader() {
  return defer({
    events: loadEvents(),
  });
}
