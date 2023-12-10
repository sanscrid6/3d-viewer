import { Point } from 'src/point/entities/point.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Location {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ default: '' })
  description: string;

  @Column({ default: false })
  isPayed: boolean;

  @Column({ default: '' })
  previewUrl: string;

  @ManyToOne(() => User, { onDelete: 'SET NULL' })
  user: User;

  @OneToMany(() => Point, (p) => p.location)
  points: Point[];
}
