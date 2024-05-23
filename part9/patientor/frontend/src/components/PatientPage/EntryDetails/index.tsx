import { HealthCheckDetails } from './HealthCheckDetails';
import { OccupationalHealthcareDetails } from './OccupationalHealthCareDetails';
import { HospitalDetails } from './HospitalDetails';
import { assertNever } from '../../../utils';
import { EntryDetailsTypes } from '../../../types';

export const EntryDetails = ({ entry, codes }: EntryDetailsTypes) => {
  switch (entry.type) {
    case 'HealthCheck':
      return <HealthCheckDetails entry={entry} codes={codes} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcareDetails entry={entry} codes={codes} />;
    case 'Hospital':
      return <HospitalDetails entry={entry} codes={codes} />;
    default:
      return assertNever(entry);
  }
};
