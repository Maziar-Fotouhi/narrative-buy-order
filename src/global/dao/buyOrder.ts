import {DataPackageType} from './dataPackageType';
import {Constants} from '../constants';

export class BuyOrder {

  id: string;

  constructor(
    public name: string,
    public maxBidPrice: string,
    public dataPackageType: DataPackageType) {
    // Math.random should be unique because of its seeding algorithm.
    // Add a unique prefix and generate a random id in base 36 (numbers + letters), and grab the first 9 characters after the decimal.
    this.id = Constants.STORAGE_PREFIX + Math.random().toString(36).substr(2, 9);
  }
}
