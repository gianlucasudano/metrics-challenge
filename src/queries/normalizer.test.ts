import { metricsInput } from 'mocks/helpers/metrics';
import { expectedOutputMetricsGet } from 'mocks/handlers/mocks';
import getGroupedMetrics, { type TymesMetric } from './normalizers';

describe('getGroupedMetrics', () => {
  it('return an array of valid objects', () => {
    expect(getGroupedMetrics(metricsInput as TymesMetric)).toStrictEqual(
      expectedOutputMetricsGet
    );
  });
});
