import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Service } from 'src/services/entities/service.entity';

export enum BookingStatus {
  PENDING = 'Pending',
  CONFIRMED = 'Confirmed',
  CANCELLED = 'Cancelled',
  COMPLETED = 'Completed',
}

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  customerName!: string;

  @Column()
  customerEmail!: string;

  @Column()
  customerPhone!: string;

  @Column({
    type: 'date',
  })
  bookingDate!: Date;

  @Column({
    type: 'time',
  })
  bookingTime!: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  notes!: string;

  @Column({
    type: 'enum',
    enum: BookingStatus,
    default: BookingStatus.PENDING,
  })
  status!: BookingStatus;

  @ManyToOne(() => Service, (service) => service.bookings)
  @JoinColumn({
    name: 'serviceId',
  })
  service!: Service;

  @CreateDateColumn()
  createdAt!: Date;
}
