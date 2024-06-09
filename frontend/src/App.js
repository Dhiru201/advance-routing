import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "./components/pages/RootLayout";
import HomePage from "./components/pages/HomePage";
import EventsPage, { eventsLoader } from "./components/pages/EventsPage";
import EventDetailPage, {
  loader as eventDetailLoader,
  action as deleteEventAction,
  action,
} from "./components/pages/EventDetailPage";
import NewEventPage from "./components/pages/NewEventPage";
import EditEventPage from "./components/pages/EditEventPage";
import EventsRoot from "./components/pages/EventsRoot";
import { action as manipilateEventAction } from "./components/EventForm";
import NewsletterPage, {
  action as newsletterAction,
} from "./components/Newsletter";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "events",
        element: <EventsRoot />,
        children: [
          {
            index: true,
            element: <EventsPage />,
            loader: eventsLoader,
          },
          {
            path: ":id",
            id: "event-detail",
            loader: eventDetailLoader,
            children: [
              {
                index: true,
                element: <EventDetailPage />,
                action: deleteEventAction,
              },
              {
                path: "edit",
                element: <EditEventPage />,
                action: manipilateEventAction,
              },
            ],
          },
          {
            path: "new",
            element: <NewEventPage />,
            action: manipilateEventAction,
          },
        ],
      },
      {
        path: "newsletter",
        element: <NewsletterPage />,
        action: newsletterAction,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
