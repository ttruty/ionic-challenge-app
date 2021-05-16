import { User } from '../auth/user.model';
export class Challenge {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public icon: string,
    public unit: string,
    public amount: number,
    public due: Date,
    public assigned: Date,
    public userId: string,
    public assignedTo?: User[]
  ) {}
}
