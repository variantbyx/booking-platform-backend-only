import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Booking } from './entities/booking.entity';
import { Service } from '../services/entities/service.entity';

import { CreateBookingDto } from './dto/create-booking';
import { UpdateBookingDto } from './dto/update-booking';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
  ) {}

  async create(createBookingDto: CreateBookingDto) {
    const todayStr = new Date().toISOString().split('T')[0];
    const bookingDateStr = createBookingDto.bookingDate.split('T')[0];

    if (bookingDateStr < todayStr) {
      throw new BadRequestException('Booking date cannot be in the past');
    }

    const service = await this.serviceRepository.findOne({
      where: { id: createBookingDto.serviceId },
    });

    if (!service) {
      throw new NotFoundException('Service not found');
    }

    const existingBooking = await this.bookingRepository.findOne({
      where: {
        bookingDate: createBookingDto.bookingDate as any,
        bookingTime: createBookingDto.bookingTime,
        service: {
          id: createBookingDto.serviceId,
        },
      },
    });

    if (existingBooking) {
      throw new ConflictException(
        'This service is already booked for the selected date and time.',
      );
    }

    const booking = this.bookingRepository.create({
      ...createBookingDto,
      service,
    });

    return this.bookingRepository.save(booking);
  }

  async findAll() {
    return this.bookingRepository.find({
      relations: ['service'],
    });
  }

  async findOne(id: number) {
    const booking = await this.bookingRepository.findOne({
      where: { id },
      relations: ['service'],
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    return booking;
  }

  async update(id: number, updateBookingDto: UpdateBookingDto) {
    const booking = await this.findOne(id);

    if (updateBookingDto.serviceId !== undefined) {
      const service = await this.serviceRepository.findOne({
        where: { id: updateBookingDto.serviceId },
      });

      if (!service) {
        throw new NotFoundException('Service not found');
      }

      booking.service = service;
    }

    const { serviceId, ...rest } = updateBookingDto;
    Object.assign(booking, rest);

    return this.bookingRepository.save(booking);
  }

  async remove(id: number) {
    const booking = await this.findOne(id);

    await this.bookingRepository.remove(booking);

    return {
      message: 'Booking deleted successfully',
    };
  }
}

