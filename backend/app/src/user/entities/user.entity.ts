import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Index({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @Column({ type: 'decimal', precision: 100, scale: 2, default: 0 })
  balance: number;

  @Column('text', { array: true, default: [] })
  hashes: string[];
}
