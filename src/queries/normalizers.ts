import { secondToHumanReadable, percComparedToDays } from 'helpers/helpers';

export enum Names {
  Import = 'IMPORT_FROM_CALENDAR',
  Edit = 'MODAL_EDIT',
  Submit = 'MODAL_SUBMIT',
  Skip = 'MODAL_SKIP_SURVEY',
  Survey = 'MODAL_SURVEY',
  SurveySubmit = 'MODAL_SUBMIT_SURVEY',
}

export type Metric = {
  id: number;
  name: Names;
  value: number;
  addedAt: number;
};

export type TymesMetric = Metric[];

export type MetricOutput = {
  name: Names;
  averagePerDay: Record<string, string>;
  averagePerHour: Record<string, string>;
  averagePerMinute: Record<string, string>;
  totalActions: number;
  totalValue: Record<string, string>;
  latestDate: number;
  earliestDate: number;
  percentageToDays: number;
};

type GetGroupedMetrics = (input: TymesMetric) => Record<string, MetricOutput>;

const MILLISECONDS = 1000;
const SECOND = 1;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

const getGroupedMetrics: GetGroupedMetrics = (input) => {
  const groupedMetrics: Record<Names, Metric[]> = input.reduce(
    (accumulator, currentMetric) => {
      if (!accumulator[currentMetric.name]) {
        accumulator[currentMetric.name] = [];
      }
      accumulator[currentMetric.name].push(currentMetric);
      return accumulator;
    },
    {} as Record<Names, Metric[]>
  );

  const metricOutput = Object.entries(groupedMetrics).map(([name, metrics]) => {
    const totalValue = metrics.reduce(
      (accumulator, currentMetric) => accumulator + currentMetric.value,
      0
    );
    const totalActions = metrics.length;
    const sortedMetrics: Metric[] = [...metrics].sort(
      (a, b) => a.addedAt - b.addedAt
    );

    const totalTime =
      sortedMetrics[totalActions - 1].addedAt - sortedMetrics[0].addedAt;

    const totalDays = totalTime / DAY / MILLISECONDS;
    const totalHours = totalTime / HOUR / MILLISECONDS;
    const totalMinutes = totalTime / MINUTE / MILLISECONDS;

    const averagePerDay = secondToHumanReadable(totalValue / totalDays);
    const averagePerHour = secondToHumanReadable(totalValue / totalHours);
    const averagePerMinute = secondToHumanReadable(totalValue / totalMinutes);
    const latestDate = sortedMetrics[0].addedAt;
    const earliestDate = sortedMetrics[totalActions - 1].addedAt;

    return {
      name: name as Names,
      averagePerDay,
      averagePerHour,
      averagePerMinute,
      totalActions,
      totalValue: secondToHumanReadable(totalValue),
      totalValueSecs: totalValue,
      latestDate,
      earliestDate,
      percentageToDays: percComparedToDays(
        totalValue,
        totalTime / MILLISECONDS
      ),
    };
  });

  const groupedByName = metricOutput.reduce((acc, currentGroup) => {
    acc[currentGroup.name] = currentGroup;
    return acc;
  }, {} as Record<string, MetricOutput>);

  return groupedByName;
};

const happyPath = [Names.Import, Names.Submit];
const halfHappyPath = [Names.Import, Names.Edit, Names.Submit];
const unhappyPath = [Names.Import, Names.Skip];
const unhappyPathSurvey = [Names.Import, Names.Survey, Names.SurveySubmit];

const paths = {
  happyPath,
  halfHappyPath,
  unhappyPath,
  unhappyPathSurvey,
};

export const getJourneys = (groupedMetrics) => {
  const journeyKeys = Object.keys(paths);
  const journeysByName = journeyKeys.reduce((acc, currentJourney) => {
    const journeysData = paths[currentJourney].map((journey: Names) => {
      return groupedMetrics[journey];
    });
    const percentage = journeysData.reduce(
      (acc, currentData) => acc + currentData.percentageToDays,
      0
    );
    const totalHumanReadable = journeysData.reduce(
      (acc, currentData) => acc + currentData.totalValueSecs,
      0
    );
    const endDate = [
      ...journeysData.map((journey) => journey.earliestDate),
    ].sort((a, b) => a - b)[0];

    const startDate = [
      ...journeysData.map((journey) => journey.latestDate),
    ].sort((a, b) => a - b)[0];

    acc[currentJourney] = {
      percentage,
      totalHumanReadable: secondToHumanReadable(totalHumanReadable),
      endDate,
      startDate,
    };
    return acc;
  }, {});

  return journeysByName;
};

export default getGroupedMetrics;
