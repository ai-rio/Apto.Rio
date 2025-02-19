erDiagram
    profiles ||--o{ properties : creates
    profiles ||--o{ inquiries : sends
    profiles ||--o{ favorites : saves
    profiles }o--|| pricing_plans : subscribes_to
    
    profiles ||--o{ developer_profiles : extends_as
    profiles ||--o{ agent_profiles : extends_as
    
    developer_profiles ||--o{ properties : publishes
    agent_profiles ||--o{ agent_properties : manages
    properties ||--o{ agent_properties : managed_by
    
    properties ||--o{ property_media : has
    properties ||--o{ inquiries : receives
    properties ||--o{ favorites : saved_in
    
    pricing_plans ||--o{ pricing_features : includes
    
    profiles {
        uuid id PK
        string first_name
        string last_name
        string email UK
        string picture
        string name
        boolean is_subscribed
        uuid plan_id FK
        string stripe_customer_id
        timestamp last_plan_update
        string user_type
        timestamp created_at
        timestamp updated_at
    }
    
    pricing_plans {
        uuid id PK
        string name
        string slug UK
        integer price_monthly
        integer price_yearly
        string description
        string cta
        boolean most_popular
        boolean is_active
        boolean is_featured
        timestamp created_at
    }
    
    pricing_features {
        uuid id PK
        string name
        uuid plan_id FK
        timestamp created_at
    }
    
    developer_profiles {
        uuid id PK
        uuid profile_id FK
        string company_name
        string logo_url
        text description
        json contact_info
        string status
        timestamp created_at
    }
    
    agent_profiles {
        uuid id PK
        uuid profile_id FK
        string license_number
        string bio
        json specializations
        boolean active_status
        timestamp created_at
    }
    
    properties {
        uuid id PK
        string slug UK
        string title
        text description
        string development_stage
        timestamp estimated_completion
        json location
        uuid developer_id FK
        int total_units
        json features
        double min_price
        double max_price
        string status
        boolean featured
        uuid created_by FK
        timestamp created_at
        timestamp updated_at
    }
    
    property_media {
        uuid id PK
        uuid property_id FK
        string media_type
        string url
        string title
        int display_order
        timestamp created_at
    }
    
    inquiries {
        uuid id PK
        uuid property_id FK
        uuid profile_id FK
        string inquiry_type
        text message
        string status
        timestamp created_at
    }
    
    favorites {
        uuid profile_id FK
        uuid property_id FK
        timestamp created_at
    }
    
    agent_properties {
        uuid agent_id FK
        uuid property_id FK
        timestamp created_at
    }