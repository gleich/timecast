import { Icon, List, ListItem, render } from "@raycast/api";
import { getTimeZones } from "@vvo/tzdb";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

render(<Main />);

function Main(): JSX.Element {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  const timeZones = getTimeZones();
  const currentTimeOffset = dayjs().utcOffset();
  const names: string[] = [];
  return (
    <List>
      {timeZones.map((t) => {
        if (names.includes(t.alternativeName)) {
          return;
        }
        const timeThere = dayjs().tz(t.name);
        names.push(t.alternativeName);
        return (
          <ListItem
            key={t.name}
            id={t.name}
            title={t.alternativeName}
            keywords={[t.abbreviation, ...t.mainCities, t.continentName, t.name, t.alternativeName]}
            accessoryIcon={Icon.Clock}
            subtitle={String(((timeThere.utcOffset() - currentTimeOffset) / 100).toFixed()) + ":00"}
            accessoryTitle={timeThere.format("M-D-YY h:m:s A")}
          />
        );
      })}
    </List>
  );
}
