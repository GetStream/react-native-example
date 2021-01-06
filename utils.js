export function goToProfile(id) {
  // TODO: implement
  console.log("user id: ", id);
}

export function userOrDefault (user) {
  let actor;
  const notFound = {
    id: "!not-found",
    created_at: "",
    updated_at: "",
    data: { name: "Unknown", profileImage: "" }
  };
  if (typeof user === "string" || typeof user.error === "string") {
    actor = notFound;
  } else {
    //$FlowBug
    actor = (user);
  }
  return actor;
}
