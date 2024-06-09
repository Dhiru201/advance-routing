import React from "react";
import { Suspense } from "react";
import {
  useRouteLoaderData,
  useParams,
  json,
  redirect,
  Await,
  defer,
} from "react-router-dom";
import EventItem from "../EventItem";
import EventsList from "../EventsList";

function EventDetailPage() {
  const { event, events } = useRouteLoaderData("event-detail");

  return (
    <>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={event}>
          {(loadedEvent) => <EventItem event={loadedEvent} />}
        </Await>
      </Suspense>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={events}>
          {(loadedEvents) => <EventsList events={loadedEvents} />}
        </Await>
      </Suspense>
    </>
  );
}

export default EventDetailPage;
async function loadEvent(id) {
  const response = await fetch("http://localhost:8080/events/" + id);
  // incorrect rezsponse case ...
  if (!response.ok) {
    throw json({ message: "Could not fetch events details." }, { status: 500 });
  } else {
    const resData = await response.json();
    return resData.event;
  }
}
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

export async function loader({ request, params }) {
  let id = params.id;
  return defer({
    event: await loadEvent(id),
    events: loadEvents(),
  });
}

export async function action({ params, request }) {
  const id = params.id;
  let response = await fetch("http://localhost:8080/events/" + id, {
    method: request.method,
  });
  // incorrect rezsponse case ...
  if (!response.ok) {
    throw json({ message: "Could not delete events." }, { status: 500 });
  } else {
    return redirect("/events");
  }
}
