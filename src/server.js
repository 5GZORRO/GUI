/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { createServer, Model, Factory, belongsTo, RestSerializer, hasMany } from 'miragejs'
import faker from 'faker'

export function makeServer ({ environment = 'development' } = {}) {
  const server = createServer({
    environment,

    serializers: {
      resource: RestSerializer.extend({
        serializeIds: false,
        include: ['resourceSpecification', 'category', 'resourcePhysicalCapabilities', 'resourceVirtualCapabilities'],
        embed: true
      }),
      resourcePhysicalCapabilitie: RestSerializer.extend({
        serializeIds: false,
        include: ['hardwareCapabilities', 'feature'],
        embed: true
      }),
      resourceVirtualCapabilitie: RestSerializer.extend({
        serializeIds: false,
        include: ['virtualCapabilities'],
        embed: true
      })
    },

    models: {
      pagedGovernanceProposal: Model,
      membership: Model,
      resource: Model.extend({
        resourceSpecification: belongsTo(),
        category: belongsTo(),
        resourcePhysicalCapabilities: hasMany(),
        resourceVirtualCapabilities: hasMany()
      }),

      category: Model,

      resourceSpecification: Model,

      resourcePhysicalCapabilitie: Model.extend({
        hardwareCapabilities: hasMany(),
        feature: belongsTo()
      }),

      hardwareCapabilitie: Model,
      feature: Model,

      resourceVirtualCapabilitie: Model.extend({
        virtualCapabilities: hasMany()
      }),
      virtualCapabilitie: Model
    },

    factories: {
      pagedGovernanceProposal: Factory.extend({
        proposalId () {
          return faker.random.uuid()
        },
        status () {
          return faker.random.arrayElement(['PROPOSED', 'APPROVED', 'REJECTED'])
        },
        actionType () {
          return faker.random.arrayElement([
            'ONBOARD_STAKEHOLDER',
            'NEW_LEGAL_PROSE_TEMPLATE',
            'ARCHIVE_LEGAL_PROSE_TEMPLATE',
            'SLA_DISPUTE'
          ])
        },
        statusUpdated () {
          return faker.date.recent()
        },
        actionParams () {
          return {
            entityIdentityId: faker.random.uuid(),
            evidence: faker.random.word()
          }
        }
      }),

      membership: Factory.extend({
        stakeholderId () {
          return faker.random.uuid()
        },
        legalName () {
          return faker.random.word()
        },
        address () {
          return faker.address.streetAddress()
        }
      }),

      resource: Factory.extend({
        name () {
          return faker.lorem.word()
        },
        description () {
          return faker.commerce.productDescription()
        },
        version () {
          return faker.system.semver()
        },
        validFor () {
          return faker.date.past()
        },
        ownerdid () {
          return faker.random.uuid()
        }
      }),

      category: Factory.extend({
        name () {
          return faker.lorem.word()
        },
        type () {
          return faker.name.jobType()
        },
        version () {
          return faker.system.semver()
        }
      }),

      resourceSpecification: Factory.extend({
        name () {
          return faker.lorem.word()
        },
        description () {
          return faker.commerce.productDescription()
        },
        version () {
          return faker.system.semver()
        }
      }),

      resourcePhysicalCapabilitie: Factory.extend({
        name () {
          return faker.lorem.word()
        },
        description () {
          return faker.commerce.productDescription()
        }
      }),

      feature: Factory.extend({
        bundled () {
          return faker.random.boolean()
        },
        type () {
          return faker.random.word()
        }
      }),

      hardwareCapabilitie: Factory.extend({
        value () {
          return faker.random.float()
        },
        quota () {
          return faker.random.word()
        }
      }),

      resourceVirtualCapabilitie: Factory.extend({
        name () {
          return faker.lorem.word()
        },
        description () {
          return faker.commerce.productDescription()
        },
        isMaster () {
          return faker.random.boolean()
        },
        type () {
          return faker.database.type()
        }
      }),

      virtualCapabilitie: Factory.extend({
        capValue () {
          return faker.random.float()
        },
        capUnit () {
          return faker.random.number()
        }
      })
    },

    seeds (server) {
      server.createList('pagedGovernanceProposal', 60)
      server.createList('membership', 60)
      server.createList('resource', 10, {
        resourceSpecification: server.create('resourceSpecification'),
        category: server.create('category'),
        resourcePhysicalCapabilities: server.createList('resourcePhysicalCapabilitie', 5, {
          hardwareCapabilities: server.createList('hardwareCapabilitie', 5),
          feature: server.create('feature')
        }),
        resourceVirtualCapabilities: server.createList('resourceVirtualCapabilitie', 2, {
          virtualCapabilities: server.createList('virtualCapabilitie', 3)
        })
      })
    },

    routes () {
      this.namespace = 'api'

      this.get('/governance-actions', (schema) => {
        const content = schema.pagedGovernanceProposals.all()
        const items = content.models.map(({ attrs }) => ({ ...attrs }))
        return {
          pagedGovernanceProposals: {
            totalPages: 0,
            totalElements: items.length || 0,
            size: items.length || 0,
            content: items,
            number: items.length,
            sort: {
              sorted: true,
              unsorted: true,
              empty: false
            },
            pageable: {
              page: 0,
              size: 5,
              sort: [
                'string'
              ]
            },
            first: true,
            last: true,
            numberOfElements: 5,
            empty: !items
          }
        }
      })

      this.post('/governance-actions', (schema, request) => {
        const attrs = JSON.parse(request.requestBody)
        console.log(attrs)

        return schema.pagedGovernanceProposals.create(attrs)
      })

      this.get('/memberships', (schema) => {
        const content = schema.memberships.all()
        const items = content.models.map(({ attrs }) => ({ ...attrs }))
        return {
          pagedMembers: {
            totalPages: 0,
            totalElements: items.length || 0,
            size: items.length || 0,
            content: items,
            number: items.length,
            sort: {
              sorted: true,
              unsorted: true,
              empty: false
            },
            pageable: {
              page: 0,
              size: 5,
              sort: [
                'string'
              ]
            },
            first: true,
            last: true,
            numberOfElements: 5,
            empty: !items
          }
        }
      })

      this.get('/resources', (schema, request) => {
        const attrs = JSON.parse(request.requestBody)
        console.log(attrs)
        return schema.resources.all()
      })

      this.get('/resources/:id', (schema, request) => {
        const id = request.params.id
        console.log('id')
        return schema.resources.find(id)
        // new Response(400, { some: 'header' }, { errors: [ 'name cannot be blank'] });
      })

      this.post('/resources', (schema, request) => {
        const attrs = JSON.parse(request.requestBody)
        console.log(attrs)
        return schema.resources.create(attrs)
        // new Response(400, { some: 'header' }, { errors: [ 'name cannot be blank'] });
      })

      this.post('/resources/:id/category', (schema, request) => {
        const attrs = JSON.parse(request.requestBody)
        console.log(attrs)
        return schema.category.create(attrs)
        // new Response(400, { some: 'header' }, { errors: [ 'name cannot be blank'] });
      })
    }
  })

  return server
}
