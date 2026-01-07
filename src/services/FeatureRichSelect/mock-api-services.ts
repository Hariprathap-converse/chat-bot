export const fetchDropDownData = async (queryString: string) => {
  try {
    const params = new URLSearchParams(queryString);
    const search = params.get("search") || "";
    const page = parseInt(params.get("page") || "1", 10);
    const recordLimit = parseInt(params.get("record_limit") || "10");

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const url = `http://localhost:4000/options?q=${encodeURIComponent(
      search
    )}&_page=${page}&_limit=${recordLimit}`;

    const res = await fetch(url);

    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

    const totalCount = res.headers.get("X-Total-Count");
    const data = await res.json();

    const isGrouped =
      Array.isArray(data) && data[0]?.group && Array.isArray(data[0]?.items);

    const formattedOptions = isGrouped
      ? data.map((group: any) => ({
          id: group.id,
          group: group.group,
          items: group.items.map((item: any) => ({
            id: item.id,
            value: item.value,
          })),
        }))
      : data.map((item: any) => ({
          id: item.id,
          value: item.value,
        }));
    return {
      total_records: parseInt(totalCount || "0", 10),
      options: formattedOptions,
    };
  } catch (err) {
    console.error("fetchDropDownData error:", err);
    return { total_records: 0, options: [] };
  }
};
