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

  @Column({ default: '' })
  previewUrl: string;

  @Column({ default: false })
  isPublic: boolean;

  @ManyToOne(() => User, { onDelete: 'SET NULL' })
  user: User;

  @OneToMany(() => Point, (p) => p.location)
  points: Point[];
}
