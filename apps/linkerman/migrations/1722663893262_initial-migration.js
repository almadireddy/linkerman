/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  pgm.createTable('users', {
    id: { type: 'uuid', unique: true },
    email: 'text',
    active: 'boolean'
  });

  pgm.createTable('links', {
    id: { type: 'uuid', unique: true },
    shortname: { type: 'varchar(1000)', notNull: true },
    destination: { type: 'text', notNull: true },
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp')
    },
    owner: {
      type: 'uuid'
    },
    active: 'boolean'
  });

  pgm.createTable('linkaccess', {
    id: { type: 'uuid', unique: true },
    link: 'uuid',
    accessTime: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp')
    },
    additionalData: {
      type: 'jsonb'
    }
  });

  pgm.addConstraint('links', 'links_owner_fk', {
    foreignKeys: {
      columns: 'owner',
      references: 'users(id)',
      onDelete: 'SET NULL'
    }
  });

  pgm.addConstraint('linkaccess', 'linkaccess_link_fk', {
    foreignKeys: {
      columns: 'link',
      references: 'links(id)',
      onDelete: 'NO ACTION'
    }
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.dropConstraint('linkaccess', 'linkaccess_link_fk');
  pgm.dropConstraint('links', 'links_owner_fk');

  pgm.dropTable('linkaccess');
  pgm.dropTable('links');
  pgm.dropTable('users');
};
