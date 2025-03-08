export const getFetch = async () => {
  const response = await fetch("/api/tasks/get");
  const data = await response.json();
  return data;
};
