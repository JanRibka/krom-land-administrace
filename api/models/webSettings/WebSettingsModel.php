<?php

namespace kromLand\api\models\webSettings;

class WebSettingsModel
{
    public int $Id;
    public string|null $FacebookLink;
    public string|null $InstagramLink;
    public string|null $TikTokLink;
    public string|null $SubjectName;
    public string|null $SubjectICO;
    public string|null $SubjectDIC;
    public string|null $AddressName;
    public string|null $AddressAddress;
    public string|null $AddressLink;
    public string|null $ContactName;
    public string|null $ContactHours;
    public string|null $ContactTel;
    public string|null $ContactEmail;

    public function __construct(
        int $id,
        string|null $facebookLink,
        string|null $instagramLink,
        string|null $tikTokLink,
        string|null $subjectName,
        string|null $subjectICO,
        string|null $subjectDIC,
        string|null $addressName,
        string|null $addressAddress,
        string|null $addressLink,
        string|null $contactName,
        string|null $contactHours,
        string|null $contactTel,
        string|null $contactEmail,
        ) {
        $this->Id = $id;
        $this->FacebookLink = $facebookLink;
        $this->InstagramLink = $instagramLink;
        $this->TikTokLink = $tikTokLink;
        $this->SubjectName = $subjectName;
        $this->SubjectICO = $subjectICO;
        $this->SubjectDIC = $subjectDIC;
        $this->AddressName = $addressName;
        $this->AddressAddress = $addressAddress;
        $this->AddressLink = $addressLink;
        $this->ContactName = $contactName;
        $this->ContactHours = $contactHours;
        $this->ContactTel = $contactTel;
        $this->ContactEmail = $contactEmail;
    }
}
