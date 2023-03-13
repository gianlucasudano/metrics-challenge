import { secondToHumanReadable } from 'helpers/helpers';

enum Names {
  Import = 'IMPORT_FROM_CALENDAR',
  Edit = 'MODAL_EDIT',
  Submit = 'MODAL_SUBMIT',
  Skip = 'MODAL_SKIP_SURVEY',
  Survey = 'MODAL_SURVEY',
  SurveySubmit = 'MODAL_SUBMIT_SURVEY',
}

type Metric = {
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
      latestDate,
      earliestDate,
    };
  });

  const groupedByName = metricOutput.reduce((acc, currentGroup) => {
    acc[currentGroup.name] = currentGroup;
    return acc;
  }, {} as Record<string, MetricOutput>);
  return groupedByName;
};

export default getGroupedMetrics;
